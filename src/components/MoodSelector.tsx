import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Heart, Zap } from 'lucide-react';

interface MoodSelectorProps {
  onMoodSubmit: (mood: string, journal: string) => void;
}

const moods = [
  { emoji: '😁', label: 'Amazing', value: 'amazing', color: 'gradient-success' },
  { emoji: '😊', label: 'Good', value: 'good', color: 'gradient-wellness' },
  { emoji: '😐', label: 'Okay', value: 'okay', color: 'gradient-calm' },
  { emoji: '😔', label: 'Down', value: 'down', color: 'gradient-energy' },
  { emoji: '😡', label: 'Angry', value: 'angry', color: 'bg-destructive' },
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

        {/* Mood Selection */}
        <div className="flex flex-wrap justify-center gap-4">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`mood-emoji p-4 rounded-2xl border-2 transition-all ${
                selectedMood === mood.value
                  ? 'mood-emoji selected border-primary shadow-lg'
                  : 'border-transparent hover:border-primary/30'
              }`}
            >
              <div className="text-center space-y-2">
                <div className="text-5xl">{mood.emoji}</div>
                <span className="block text-sm font-medium text-muted-foreground">
                  {mood.label}
                </span>
              </div>
            </button>
          ))}
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