import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Heart, Zap } from 'lucide-react';

interface MoodSelectorProps {
  onMoodSubmit: (mood: string, journal: string) => void;
}

const moods = [
  // Positive emotions
  { emoji: '😁', label: 'Amazing', value: 'amazing', color: 'gradient-success', category: 'positive' },
  { emoji: '🤩', label: 'Excited', value: 'excited', color: 'gradient-energy', category: 'positive' },
  { emoji: '😊', label: 'Happy', value: 'happy', color: 'gradient-wellness', category: 'positive' },
  { emoji: '😌', label: 'Content', value: 'content', color: 'gradient-calm', category: 'positive' },
  { emoji: '🥰', label: 'Loved', value: 'loved', color: 'gradient-success', category: 'positive' },
  
  // Neutral emotions
  { emoji: '😐', label: 'Okay', value: 'okay', color: 'bg-muted', category: 'neutral' },
  { emoji: '😑', label: 'Meh', value: 'meh', color: 'bg-muted', category: 'neutral' },
  { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful', color: 'gradient-calm', category: 'neutral' },
  { emoji: '😴', label: 'Tired', value: 'tired', color: 'bg-muted', category: 'neutral' },
  
  // Difficult emotions
  { emoji: '😔', label: 'Sad', value: 'sad', color: 'gradient-crisis', category: 'difficult' },
  { emoji: '😟', label: 'Worried', value: 'worried', color: 'gradient-crisis', category: 'difficult' },
  { emoji: '😣', label: 'Stressed', value: 'stressed', color: 'bg-destructive', category: 'difficult' },
  { emoji: '😡', label: 'Angry', value: 'angry', color: 'bg-destructive', category: 'difficult' },
  { emoji: '😰', label: 'Anxious', value: 'anxious', color: 'gradient-crisis', category: 'difficult' },
  { emoji: '😭', label: 'Crying', value: 'crying', color: 'gradient-crisis', category: 'difficult' },
  
  // Crisis support needed
  { emoji: '😞', label: 'Depressed', value: 'depressed', color: 'bg-destructive', category: 'crisis' },
  { emoji: '💔', label: 'Heartbroken', value: 'heartbroken', color: 'bg-destructive', category: 'crisis' },
  { emoji: '🆘', label: 'Need Help', value: 'crisis', color: 'bg-destructive', category: 'crisis' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [journal, setJournal] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    
    // Add confetti animation effect
    const confettiTimeout = setTimeout(() => {
      onMoodSubmit(selectedMood, journal);
      setSelectedMood('');
      setJournal('');
      setIsSubmitting(false);
    }, 1000);

    return () => clearTimeout(confettiTimeout);
  };

  return (
    <Card className="wellness-card">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <h3 className="text-2xl font-bold text-gradient">How are you feeling today?</h3>
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </div>
        </div>

        {/* Mood Selection by Category */}
        <div className="space-y-6">
          {/* Positive Emotions */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-success flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Feeling Good
            </h4>
            <div className="flex flex-wrap gap-3">
              {moods.filter(mood => mood.category === 'positive').map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`mood-emoji p-3 rounded-xl border-2 transition-all ${
                    selectedMood === mood.value
                      ? 'mood-emoji selected border-primary shadow-lg scale-110'
                      : 'border-transparent hover:border-primary/30'
                  }`}
                >
                  <div className="text-center space-y-1">
                    <div className="text-3xl">{mood.emoji}</div>
                    <span className="block text-xs font-medium text-muted-foreground">
                      {mood.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Neutral Emotions */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Just Okay</h4>
            <div className="flex flex-wrap gap-3">
              {moods.filter(mood => mood.category === 'neutral').map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`mood-emoji p-3 rounded-xl border-2 transition-all ${
                    selectedMood === mood.value
                      ? 'mood-emoji selected border-primary shadow-lg scale-110'
                      : 'border-transparent hover:border-primary/30'
                  }`}
                >
                  <div className="text-center space-y-1">
                    <div className="text-3xl">{mood.emoji}</div>
                    <span className="block text-xs font-medium text-muted-foreground">
                      {mood.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficult Emotions */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-warning flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Having a Tough Time
            </h4>
            <div className="flex flex-wrap gap-3">
              {moods.filter(mood => mood.category === 'difficult').map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`mood-emoji p-3 rounded-xl border-2 transition-all ${
                    selectedMood === mood.value
                      ? 'mood-emoji selected border-primary shadow-lg scale-110'
                      : 'border-transparent hover:border-primary/30'
                  }`}
                >
                  <div className="text-center space-y-1">
                    <div className="text-3xl">{mood.emoji}</div>
                    <span className="block text-xs font-medium text-muted-foreground">
                      {mood.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Crisis Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-destructive flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Need Support
            </h4>
            <div className="flex flex-wrap gap-3">
              {moods.filter(mood => mood.category === 'crisis').map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`mood-emoji p-3 rounded-xl border-2 transition-all ${
                    selectedMood === mood.value
                      ? 'mood-emoji selected border-destructive shadow-lg scale-110'
                      : 'border-transparent hover:border-destructive/30'
                  }`}
                >
                  <div className="text-center space-y-1">
                    <div className="text-3xl">{mood.emoji}</div>
                    <span className="block text-xs font-medium text-muted-foreground">
                      {mood.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {moods.some(mood => mood.category === 'crisis' && selectedMood === mood.value) && (
              <div className="mt-4 p-4 bg-destructive/10 rounded-xl">
                <p className="text-sm text-destructive font-medium mb-2">
                  💙 You're not alone. Help is available 24/7:
                </p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• Crisis Text Line: Text HOME to 741741</p>
                  <p>• National Suicide Prevention Lifeline: 988</p>
                  <p>• Or reach out to a trusted friend, family member, or counselor</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Journal Entry */}
        {selectedMood && (
          <div className="space-y-3 animate-slideUp">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Tell us more about your day (optional)
            </label>
            <Textarea
              placeholder="What's on your mind? Share your thoughts, experiences, or anything that influenced your mood today..."
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              className="min-h-[100px] resize-none bg-muted/50 border-border/50 focus:border-primary/50 rounded-xl"
            />
          </div>
        )}

        {/* Submit Button */}
        {selectedMood && (
          <div className="flex justify-center animate-slideUp">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-wellness min-w-[200px] flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Logging your mood...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Log My Mood
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};