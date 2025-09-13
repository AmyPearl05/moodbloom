import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Heart, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface AIWellnessBuddyProps {
  buddyName?: string;
  recentMood?: string;
}

export const AIWellnessBuddy: React.FC<AIWellnessBuddyProps> = ({ 
  buddyName = "Luna", 
  recentMood 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hey there! I'm ${buddyName}, your personal wellness buddy! 🌟 I'm here to support you on your mental wellness journey. How are you feeling today?`,
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mock AI responses based on mood and context
  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Mood-based responses
    if (recentMood === 'amazing' || recentMood === 'good') {
      const positiveResponses = [
        "That's wonderful to hear! 🌈 Your positive energy is contagious! Want to share what made your day special?",
        "Love the good vibes! ✨ Keep riding that positive wave. What's one thing you're grateful for today?",
        "Amazing! 🎉 You're absolutely glowing! How about we celebrate with a quick gratitude practice?"
      ];
      return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }
    
    if (recentMood === 'down' || recentMood === 'angry') {
      const supportiveResponses = [
        "I hear you, and it's okay to feel this way. 💙 Remember, tough moments don't last, but resilient people like you do. Want to try a quick breathing exercise together?",
        "Your feelings are valid, and I'm here for you. 🤗 Sometimes a 5-minute walk or listening to your favorite song can help shift the energy. What usually makes you feel better?",
        "It's brave of you to acknowledge these feelings. 🌱 You're stronger than you know. How about we focus on one small thing that could brighten your day?"
      ];
      return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
    }

    // General conversation responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious')) {
      return "Stress happens to the best of us! 🧘‍♀️ Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8. Want me to guide you through it?";
    }
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('sleep')) {
      return "Good sleep is like a reset button for your mind! 😴 Try putting your phone away 30 minutes before bed and do some gentle stretching. Your future self will thank you!";
    }
    
    if (lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      return "Nutrition and mood are best friends! 🥗 Try starting your day with something colorful - maybe a smoothie bowl with berries? Your brain loves those antioxidants!";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('grateful')) {
      return "Gratitude is such a superpower! 🌟 Studies show it literally rewires your brain for happiness. You're already on the right track!";
    }

    // Default encouraging responses
    const defaultResponses = [
      "I love that you're taking time to check in with yourself! 💚 Self-awareness is the first step to growth. What's one small win from today?",
      "You're doing great by being here and focusing on your wellness! 🌱 Every small step counts. How can I support you today?",
      "That's really insightful! 🤔 Your journey is unique and important. What would make today feel a little brighter for you?",
      "I appreciate you sharing that with me! 💫 Remember, progress isn't always linear, and that's perfectly okay. You're exactly where you need to be."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <Card className="wellness-card h-[500px] flex flex-col">
      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
        <div className="p-2 rounded-full bg-primary/20 animate-pulse">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-gradient">
            {buddyName} - Your Wellness Buddy
          </h3>
          <p className="text-xs text-muted-foreground">Always here to listen & support 💙</p>
        </div>
        <div className="ml-auto">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            Online
          </div>
        </div>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 py-4">
        <div className="space-y-4 pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-slideUp`}
            >
              <div className={`max-w-[80%] ${message.isBot ? 'order-1' : 'order-2'}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-muted/50 text-foreground rounded-bl-md'
                      : 'gradient-wellness text-primary-foreground rounded-br-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ml-2 order-2">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-slideUp">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted/50 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2 pt-4 border-t border-border/50">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share your thoughts, ask for advice, or just say hi..."
          className="flex-1 bg-muted/50 border-border/50 focus:border-primary/50 rounded-xl"
          disabled={isTyping}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          className="btn-wellness px-4"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};