import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageSquare, Heart, Eye, Pin, Plus, Send, User, Calendar, Tag } from 'lucide-react';
import { blink } from '../../blink/client';

interface ForumPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  tags: string;
  likes: number;
  replies: number;
  views: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

interface ForumReply {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  likes: number;
  created_at: string;
}

const EnhancedForumCenter: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Strategy');
  const [newPostTags, setNewPostTags] = useState('');
  const [newReplyContent, setNewReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const categories = ['All', 'Strategy', 'Implementation', 'Governance', 'Tools', 'Networking'];

  const loadUser = async () => {
    try {
      const userData = await blink.auth.me();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      const postsData = await blink.db.forum_posts.list({
        orderBy: { is_pinned: 'desc', created_at: 'desc' }
      });
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    loadUser();
  }, []);

  const loadReplies = async (postId: string) => {
    try {
      const repliesData = await blink.db.forum_replies.list({
        where: { post_id: postId },
        orderBy: { created_at: 'asc' }
      });
      setReplies(repliesData);
    } catch (error) {
      console.error('Error loading replies:', error);
    }
  };

  const handlePostClick = async (post: ForumPost) => {
    setSelectedPost(post);
    await loadReplies(post.id);
    
    // Increment view count
    try {
      await blink.db.forum_posts.update(post.id, {
        views: post.views + 1
      });
      // Update local state
      setPosts(prev => prev.map(p => 
        p.id === post.id ? { ...p, views: p.views + 1 } : p
      ));
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !user) return;

    try {
      const newPost = {
        id: `post_${Date.now()}`,
        user_id: user.id,
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
        tags: newPostTags,
        likes: 0,
        replies: 0,
        views: 0,
        is_pinned: false
      };

      await blink.db.forum_posts.create(newPost);
      await loadPosts();
      
      setShowNewPostModal(false);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostTags('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCreateReply = async () => {
    if (!newReplyContent.trim() || !selectedPost || !user) return;

    try {
      const newReply = {
        id: `reply_${Date.now()}`,
        post_id: selectedPost.id,
        user_id: user.id,
        content: newReplyContent,
        likes: 0
      };

      await blink.db.forum_replies.create(newReply);
      await blink.db.forum_posts.update(selectedPost.id, {
        replies: selectedPost.replies + 1
      });
      
      await loadReplies(selectedPost.id);
      await loadPosts();
      setNewReplyContent('');
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleLikePost = async (post: ForumPost) => {
    try {
      await blink.db.forum_posts.update(post.id, {
        likes: post.likes + 1
      });
      setPosts(prev => prev.map(p => 
        p.id === post.id ? { ...p, likes: p.likes + 1 } : p
      ));
      if (selectedPost && selectedPost.id === post.id) {
        setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (selectedPost) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setSelectedPost(null)}
          className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          style={{
            boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
          }}
        >
          ← Back to Forum
        </button>

        {/* Post Detail */}
        <div 
          className="bg-gray-100 rounded-2xl p-8 mb-8"
          style={{
            boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)'
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {selectedPost.is_pinned && (
                <div className="flex items-center mb-2">
                  <Pin className="w-4 h-4 text-amber-500 mr-2" />
                  <span className="text-sm text-amber-600 font-medium">Pinned</span>
                </div>
              )}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedPost.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Executive Member
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(selectedPost.created_at)}
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {selectedPost.category}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleLikePost(selectedPost)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-200 transition-colors"
              style={{
                boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
              }}
            >
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">{selectedPost.likes}</span>
            </button>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed">{selectedPost.content}</p>
          </div>

          {selectedPost.tags && (
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="w-4 h-4 text-gray-500" />
              {selectedPost.tags.split(',').map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 text-gray-600 rounded-lg text-xs">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {selectedPost.replies} replies
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {selectedPost.views} views
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900">Replies ({replies.length})</h3>
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="bg-gray-100 rounded-xl p-6"
              style={{
                boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Executive Member</p>
                    <p className="text-xs text-gray-500">{formatDate(reply.created_at)}</p>
                  </div>
                </div>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{reply.likes}</span>
                </button>
              </div>
              <p className="text-gray-700">{reply.content}</p>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <div
          className="bg-gray-100 rounded-xl p-6"
          style={{
            boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
          }}
        >
          <h4 className="font-semibold text-gray-900 mb-4">Add a Reply</h4>
          <textarea
            value={newReplyContent}
            onChange={(e) => setNewReplyContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            style={{
              boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
            }}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCreateReply}
              disabled={!newReplyContent.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              style={{
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              <Send className="w-4 h-4" />
              <span>Post Reply</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Executive Forum</h1>
          <p className="text-gray-600">Connect, discuss, and share insights with fellow AI executives</p>
        </div>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2"
          style={{
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3), inset 0 0 0 1px rgba(245, 158, 11, 0.2)'
          }}
        >
          <Plus className="w-5 h-5" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search discussions..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{
              boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
            }}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{
                boxShadow: selectedCategory === category
                  ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                  : 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="bg-gray-100 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              style={{
                boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {post.is_pinned && (
                      <div className="flex items-center">
                        <Pin className="w-4 h-4 text-amber-500 mr-1" />
                        <span className="text-xs text-amber-600 font-medium">Pinned</span>
                      </div>
                    )}
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(post.created_at)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                  {post.tags && (
                    <div className="flex items-center space-x-2 mb-3">
                      {post.tags.split(',').slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-200 text-gray-600 rounded-lg text-xs">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {post.replies}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-gray-100 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: '20px 20px 40px rgba(0, 0, 0, 0.2), -20px -20px 40px rgba(255, 255, 255, 0.8)'
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Start New Discussion</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="What would you like to discuss?"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your insights, questions, or experiences..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={6}
                  style={{
                    boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  placeholder="e.g., strategy, implementation, governance"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                style={{
                  boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!newPostTitle.trim() || !newPostContent.trim()}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
              >
                Post Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedForumCenter;