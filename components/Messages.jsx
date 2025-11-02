'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Trash2, Search, X, MessageCircle, Mail } from 'lucide-react';
import { useGlobalContext } from '@/context/GlobalContext';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'conversation'
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

  const { setUnreadCount } = useGlobalContext();
  const replyRef = useRef(null);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/messages', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please log in to view messages');
        }
        throw new Error(`Failed to fetch conversations: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setConversations(Array.isArray(data) ? data : []);
      
      // Update global unread count
      const totalUnread = data.reduce((sum, conv) => sum + (conv.hasUnread ? 1 : 0), 0);
      setUnreadCount(totalUnread);

    } catch (error) {
      console.error('Error fetching conversations:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // Auto-focus reply textarea
  useEffect(() => {
    if (view === 'conversation' && replyRef.current) {
      replyRef.current.focus();
    }
  }, [view]);

  // Handle viewing a conversation
  const handleViewConversation = async (conversation) => {
    setSelectedConversation(conversation);
    setView('conversation');
    
    // Mark unread messages as read
    if (conversation.hasUnread) {
      try {
        const unreadMessages = conversation.messages.filter(msg => 
          !msg.isFromCurrentUser && !msg.read
        );
        
        // Mark each unread message as read
        for (const message of unreadMessages) {
          await fetch(`/api/messages/${message._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Refresh conversations to update counts
        await fetchConversations();
        
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    }
  };

  // Handle sending reply
  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setSending(true);
    try {
      const response = await fetch('/api/messages/reply', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          replyText: replyText.trim(),
          recipientEmail: selectedConversation.otherPerson.email,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reply');
      }

      toast.success('Reply sent successfully!');
      setReplyText('');
      
      // Refresh conversations and update selected conversation
      await fetchConversations();
      
      // Update selected conversation with fresh data
      const updatedConversations = await fetch('/api/messages', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json());
      
      const updatedConversation = updatedConversations.find(conv => 
        conv.id === selectedConversation.id
      );
      
      if (updatedConversation) {
        setSelectedConversation(updatedConversation);
      }

    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error(error.message);
    } finally {
      setSending(false);
    }
  };

  // Handle deleting a message
  const handleDeleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete message');
      }

      toast.success('Message deleted');
      await fetchConversations();
      
      // If we're viewing the conversation, update it
      if (selectedConversation) {
        const updatedConversations = await fetch('/api/messages', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json());
        
        const updatedConversation = updatedConversations.find(conv => 
          conv.id === selectedConversation.id
        );
        
        if (updatedConversation) {
          setSelectedConversation(updatedConversation);
        } else {
          // Conversation no longer exists, go back to list
          setView('list');
        }
      }

    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error(error.message);
    }
  };

  // Filter conversations
  const filteredConversations = conversations.filter(conversation => {
    // Filter by read status
    if (filter === 'unread' && !conversation.hasUnread) return false;
    if (filter === 'read' && conversation.hasUnread) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = conversation.otherPerson?.name?.toLowerCase().includes(query);
      const matchesEmail = conversation.otherPerson?.email?.toLowerCase().includes(query);
      const matchesContent = conversation.messages?.some(msg => 
        msg.body?.toLowerCase().includes(query)
      );
      
      return matchesName || matchesEmail || matchesContent;
    }
    
    return true;
  });

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Messages
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Conversation View
  if (view === 'conversation' && selectedConversation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setView('list')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Conversations
              </button>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedConversation.otherPerson?.name || 'Unknown User'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedConversation.otherPerson?.email}
                  </p>
                </div>
                
                {selectedConversation.pro?.type && (
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                    {selectedConversation.pro.type}
                  </span>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="max-h-96 overflow-y-auto p-6 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex gap-3 ${message.isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isFromCurrentUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.body}</p>
                    <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                      <span>
                        {new Date(message.createdAt).toLocaleDateString()} {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        onClick={() => handleDeleteMessage(message._id)}
                        className="hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <textarea
                  ref={replyRef}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={3}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={handleSendReply}
                  disabled={sending || !replyText.trim()}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your conversations</p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                  {conversations.filter(conv => conv.hasUnread).length} unread
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full">
                  {conversations.length} total
                </span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filter === 'unread'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter('read')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filter === 'read'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Read
                </button>
              </div>

              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Conversations List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredConversations.length === 0 ? (
              <div className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchQuery ? 'No conversations found' : 'No conversations yet'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery ? 'Try adjusting your search' : 'Your inbox is empty'}
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                    conversation.hasUnread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                  onClick={() => handleViewConversation(conversation)}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      conversation.hasUnread ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <span className={`text-lg font-semibold ${
                        conversation.hasUnread ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {conversation.otherPerson?.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-lg font-semibold ${
                            conversation.hasUnread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {conversation.otherPerson?.name || 'Unknown User'}
                          </h3>
                          
                          {conversation.hasUnread && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                              {conversation.unreadCount} new
                            </span>
                          )}
                        </div>
                        
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(conversation.lastActivity).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {conversation.otherPerson?.email}
                      </p>

                      {conversation.pro?.type && (
                        <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded mb-2">
                          {conversation.pro.type}
                        </span>
                      )}

                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {conversation.latestMessage?.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;