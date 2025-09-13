import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Heart, Shield, Send, ThumbsUp, Eye } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  mood: string;
  likes: number;
  replies: number;
  isAnonymous: boolean;
  supportType: 'encouragement' | 'experience' | 'question' | 'gratitude';
}

const PeerSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'community' | 'share' | 'support'>('community');
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [supportType, setSupportType] = useState<'encouragement' | 'experience' | 'question' | 'gratitude'>('encouragement');

  // Mock community posts
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: "Today was really tough, but I managed to complete my breathing exercise and it actually helped me feel a bit more centered. Small wins count too! 💙",
      author: "WellnessWarrior",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      mood: 'hopeful',
      likes: 12,
      replies: 3,
      isAnonymous: true,
      supportType: 'experience'
    },
    {
      id: '2', 
      content: "Grateful for this community. Reading everyone's stories reminds me that I'm not alone in this journey. Sending strength to everyone who needs it today 🌟",
      author: "HopefulHeart",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      mood: 'grateful',
      likes: 18,
      replies: 7,
      isAnonymous: true,
      supportType: 'gratitude'
    },
    {
      id: '3',
      content: "Has anyone found good strategies for dealing with Sunday anxiety? I always feel overwhelmed thinking about the week ahead.",
      author: "Seeker123",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      mood: 'anxious',
      likes: 5,
      replies: 12,
      isAnonymous: true,
      supportType: 'question'
    }
  ]);

  const supportTypeColors = {
    encouragement: 'bg-success/10 text-success border-success/20',
    experience: 'bg-primary/10 text-primary border-primary/20', 
    question: 'bg-accent/10 text-accent border-accent/20',
    gratitude: 'bg-gold/10 text-gold border-gold/20'
  };

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      author: isAnonymous ? 'Anonymous' : 'You',
      timestamp: new Date(),
      mood: 'sharing',
      likes: 0,
      replies: 0,
      isAnonymous,
      supportType
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setActiveTab('community');
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gradient flex items-center justify-center gap-2">
          <Users className="h-6 w-6" />
          Peer Support Community
        </h2>
        <p className="text-muted-foreground">Connect, share, and support each other 🤝</p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Shield className="h-3 w-3" />
            Anonymous Safe Space
          </Badge>
          <Badge variant="secondary">1,247 Members</Badge>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-muted/20 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'community' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Community Wall
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'share' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Share Support
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'support' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Support Others
          </button>
        </div>
      </div>

      {/* Community Wall Tab */}
      {activeTab === 'community' && (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              💙 This is a safe, moderated space for peer support. All posts are anonymous and reviewed for community guidelines.
            </p>
          </div>
          
          {posts.map((post) => (
            <Card key={post.id} className="wellness-card">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-wellness flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(post.timestamp)}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-xs ${supportTypeColors[post.supportType]}`}>
                    {post.supportType}
                  </Badge>
                </div>
                
                <p className="text-sm leading-relaxed">{post.content}</p>
                
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-xs">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-xs">{post.replies}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>Anonymous</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Share Support Tab */}
      {activeTab === 'share' && (
        <Card className="wellness-card">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Share Your Support</h3>
              <p className="text-sm text-muted-foreground">
                Your story could help someone else feel less alone 💙
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">What type of support are you sharing?</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(supportTypeColors).map(([type, colorClass]) => (
                    <button
                      key={type}
                      onClick={() => setSupportType(type as any)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                        supportType === type 
                          ? colorClass 
                          : 'border-border text-muted-foreground hover:border-primary/30'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Your message</label>
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your experience, encouragement, or ask for support..."
                  className="min-h-32 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {newPost.length}/500 characters
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="anonymous" className="text-muted-foreground">
                  Post anonymously (recommended)
                </label>
              </div>
            </div>

            <Button 
              onClick={handleSubmitPost} 
              disabled={!newPost.trim() || newPost.length > 500}
              className="w-full gap-2"
            >
              <Send className="h-4 w-4" />
              Share Support
            </Button>
          </div>
        </Card>
      )}

      {/* Support Others Tab */}
      {activeTab === 'support' && (
        <div className="space-y-4">
          <Card className="wellness-card">
            <div className="text-center space-y-4">
              <Heart className="h-12 w-12 mx-auto text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Ways to Support Others</h3>
                <p className="text-sm text-muted-foreground">
                  Small acts of kindness can make a big difference
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            <Card className="wellness-card">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-success" />
                  Give Encouragement
                </h4>
                <p className="text-sm text-muted-foreground">
                  Like posts that resonate with you and leave supportive comments
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Browse Posts to Support
                </Button>
              </div>
            </Card>

            <Card className="wellness-card">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Share Your Experience
                </h4>
                <p className="text-sm text-muted-foreground">
                  Answer questions from community members seeking advice
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Find Questions to Answer
                </Button>
              </div>
            </Card>

            <Card className="wellness-card">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Heart className="h-4 w-4 text-accent" />
                  Send Anonymous Support
                </h4>
                <p className="text-sm text-muted-foreground">
                  Send encouraging messages to members who might need extra support
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Send Support Message
                </Button>
              </div>
            </Card>
          </div>

          <Card className="wellness-card bg-gradient-wellness/10">
            <div className="text-center space-y-2">
              <h4 className="font-medium">Community Guidelines</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Be kind, respectful, and supportive</p>
                <p>• Keep posts related to mental wellness</p>
                <p>• No medical advice or crisis intervention</p>
                <p>• Report inappropriate content</p>
                <p>• Respect anonymity and privacy</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PeerSupport;