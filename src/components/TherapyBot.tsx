import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Heart, Phone, MessageCircle, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'crisis' | 'support' | 'normal';
}

interface TherapyBotProps {
  recentMood?: string;
  isInCrisis?: boolean;
}

const TherapyBot: React.FC<TherapyBotProps> = ({ recentMood, isInCrisis = false }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial message based on mood/crisis state
    const initialMessage = isInCrisis 
      ? {
          id: '1',
          text: "I'm really glad you reached out. Your feelings are valid, and you're not alone. I'm here to support you through this difficult time. Would you like to talk about what's happening?",
          isBot: true,
          timestamp: new Date(),
          type: 'crisis' as const
        }
      : {
          id: '1',
          text: `Hi there! I'm Luna, your virtual wellness companion. I noticed you've been feeling ${recentMood || 'like you needed some support'}. I'm here to listen and help. How are you doing right now?`,
          isBot: true,
          timestamp: new Date(),
          type: 'support' as const
        };
    
    setMessages([initialMessage]);
  }, [recentMood, isInCrisis]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const crisisResources = [
    { name: "Crisis Text Line", contact: "Text HOME to 741741", description: "24/7 crisis support via text" },
    { name: "National Suicide Prevention Lifeline", contact: "988", description: "24/7 phone and chat support" },
    { name: "SAMHSA National Helpline", contact: "1-800-662-4357", description: "Treatment referral service" }
  ];

  const generateTherapyResponse = (userMessage: string): { text: string; type: 'crisis' | 'support' | 'normal' } => {
    const message = userMessage.toLowerCase();
    
    // Crisis detection keywords
    const crisisKeywords = [
      'suicide', 'kill myself', 'end it all', 'don\'t want to live', 'hurt myself', 
      'self harm', 'hopeless', 'worthless', 'can\'t go on', 'give up'
    ];
    
    const hasCrisisKeywords = crisisKeywords.some(keyword => message.includes(keyword));
    
    if (hasCrisisKeywords || isInCrisis) {
      const crisisResponses = [
        "I'm really concerned about you and want to help. These feelings are temporary, even though they feel overwhelming right now. Have you been able to talk to anyone about how you're feeling?",
        "Thank you for trusting me with these difficult feelings. You're incredibly brave for reaching out. Right now, the most important thing is keeping you safe. Do you have someone you can be with today?",
        "I hear how much pain you're in, and I want you to know that help is available. You deserve support and care. Would it be okay if we talked about some resources that might help?",
        "Your life has value, and these intense feelings you're experiencing right now can change. Many people who have felt this way have found their way through to better times. Can we talk about what might help you feel safer right now?"
      ];
      
      return {
        text: crisisResponses[Math.floor(Math.random() * crisisResponses.length)],
        type: 'crisis'
      };
    }
    
    // Supportive therapy responses for difficult emotions
    if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      const responses = [
        "It sounds like you're going through a really tough time. Sadness can feel so heavy sometimes. Can you tell me more about what's been contributing to these feelings?",
        "I hear that you're feeling sad. It's completely natural to have these emotions - they're part of being human. What usually helps you when you're feeling this way?",
        "Thank you for sharing that with me. Depression and sadness can make everything feel harder. Have you noticed any patterns in when these feelings are strongest?"
      ];
      return { text: responses[Math.floor(Math.random() * responses.length)], type: 'support' };
    }
    
    if (message.includes('anxious') || message.includes('worried') || message.includes('panic')) {
      const responses = [
        "Anxiety can be really overwhelming. Let's take this one step at a time. Are you feeling anxious about something specific, or is it more of a general feeling?",
        "I understand how uncomfortable anxiety can be. Your body and mind are trying to protect you, even though it doesn't feel helpful right now. What does your anxiety feel like in your body?",
        "Worry and anxiety are so common, and you're not alone in feeling this way. Sometimes it helps to ground ourselves in the present moment. Can you tell me about your surroundings right now?"
      ];
      return { text: responses[Math.floor(Math.random() * responses.length)], type: 'support' };
    }
    
    if (message.includes('angry') || message.includes('mad') || message.includes('frustrated')) {
      const responses = [
        "Anger can be such a powerful emotion. It often tells us that something important to us isn't being respected or acknowledged. What's underneath that anger for you?",
        "It sounds like you're feeling really frustrated. Anger is often a secondary emotion - sometimes there's hurt, fear, or disappointment underneath. Does that resonate with you?",
        "I can hear the intensity in what you're sharing. Anger is a valid emotion, and it's okay to feel it. How do you usually cope when you're feeling this way?"
      ];
      return { text: responses[Math.floor(Math.random() * responses.length)], type: 'support' };
    }
    
    if (message.includes('stressed') || message.includes('overwhelmed') || message.includes('pressure')) {
      const responses = [
        "Stress and feeling overwhelmed are so common in our fast-paced world. It sounds like you have a lot on your plate right now. What feels most pressing to you?",
        "When we're overwhelmed, everything can feel urgent and important. Sometimes it helps to break things down into smaller, more manageable pieces. What's one thing that's been weighing on you?",
        "Stress can really impact our whole system - our thoughts, emotions, and body. Have you been able to take any breaks or do anything nurturing for yourself lately?"
      ];
      return { text: responses[Math.floor(Math.random() * responses.length)], type: 'support' };
    }
    
    if (message.includes('lonely') || message.includes('alone') || message.includes('isolated')) {
      const responses = [
        "Loneliness can be such a painful experience. Even when we're surrounded by people, we can still feel disconnected. Tell me more about what loneliness feels like for you.",
        "I'm glad you reached out - that takes courage when you're feeling alone. Connection is so important for our wellbeing. Are there people in your life you'd like to feel closer to?",
        "Feeling isolated is more common than many people realize, especially lately. You're taking a brave step by talking about it. What kinds of connections feel most meaningful to you?"
      ];
      return { text: responses[Math.floor(Math.random() * responses.length)], type: 'support' };
    }
    
    if (message.includes('better') || message.includes('good') || message.includes('happy') || message.includes('improving')) {
      const responses = [
        "I'm so glad to hear you're feeling better! It's wonderful when we can notice positive shifts in our mood and outlook. What do you think has been helping?",
        "That's really encouraging to hear. It's important to acknowledge and celebrate these positive moments. What's been different for you lately?",
        "It sounds like something has shifted for you in a positive way. These moments of feeling better can give us hope and remind us of our resilience. What's contributing to this change?"
      ];
      return { text: responses[Math.floor(Math.random() * responses.length)], type: 'normal' };
    }
    
    // General supportive responses
    const generalResponses = [
      "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what's on your mind?",
      "I appreciate you opening up. It takes courage to talk about our inner experiences. What feels most important for you to explore right now?",
      "I hear you, and I want you to know that your feelings and experiences are valid. What would feel most helpful for you in this moment?",
      "It sounds like you have a lot going on internally. Sometimes just putting our thoughts and feelings into words can be helpful. What else would you like to share?",
      "I'm listening and I care about what you're going through. Every person's experience is unique and important. How can I best support you today?"
    ];
    
    return {
      text: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      type: 'normal'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const response = generateTherapyResponse(inputMessage);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      isBot: true,
      timestamp: new Date(),
      type: response.type,
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-4">
      {/* Crisis Resources Banner */}
      {isInCrisis && (
        <Card className="wellness-card border-destructive/50 bg-destructive/5">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-semibold">Immediate Support Resources</h3>
            </div>
            <div className="grid gap-3">
              {crisisResources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{resource.name}</h4>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                  </div>
                  <Badge variant="destructive" className="gap-1 cursor-pointer">
                    <Phone className="h-3 w-3" />
                    {resource.contact}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Chat Interface */}
      <Card className="wellness-card h-96 flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-wellness flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Virtual Therapist</h3>
                <p className="text-xs text-muted-foreground">
                  {isInCrisis ? 'Crisis Support Mode' : 'Here to listen and support'}
                </p>
              </div>
            </div>
            {isInCrisis && (
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="h-3 w-3" />
                Crisis Support
              </Badge>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? message.type === 'crisis'
                        ? 'bg-destructive/10 text-destructive-foreground border border-destructive/20'
                        : message.type === 'support'
                        ? 'bg-accent/10 text-accent-foreground border border-accent/20'
                        : 'bg-muted text-muted-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isInCrisis 
              ? "🚨 This is not a replacement for emergency services. If you're in immediate danger, call 911."
              : "💙 Remember: This is supportive guidance, not professional therapy."
            }
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TherapyBot;