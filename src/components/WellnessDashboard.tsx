import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, Award, Flame, Heart, Brain } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: string;
  journal?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface WellnessDashboardProps {
  moodEntries: MoodEntry[];
  currentStreak: number;
  weeklyScore: number;
}

export const WellnessDashboard: React.FC<WellnessDashboardProps> = ({
  moodEntries,
  currentStreak,
  weeklyScore,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Generate mood calendar for the current week
  const generateWeekCalendar = () => {
    const today = new Date();
    const week = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const entry = moodEntries.find(e => e.date === dateString);
      
      week.push({
        date: dateString,
        day: date.getDate(),
        dayName: date.toLocaleDateString('en', { weekday: 'short' }),
        mood: entry?.mood,
        hasEntry: !!entry,
      });
    }
    
    return week;
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      amazing: '😁',
      good: '😊',
      okay: '😐',
      down: '😔',
      angry: '😡',
    };
    return moodMap[mood] || '😐';
  };

  const getMoodColor = (mood: string) => {
    const colorMap: Record<string, string> = {
      amazing: 'bg-success',
      good: 'bg-primary',
      okay: 'bg-secondary',
      down: 'bg-accent',
      angry: 'bg-destructive',
    };
    return colorMap[mood] || 'bg-muted';
  };

  const weekCalendar = generateWeekCalendar();
  const recentMoods = moodEntries.slice(-7);
  const positiveCount = recentMoods.filter(m => ['amazing', 'good'].includes(m.mood)).length;
  const moodTrend = positiveCount >= 4 ? 'positive' : positiveCount >= 2 ? 'neutral' : 'negative';

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="wellness-card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-success/20">
              <Flame className="h-6 w-6 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gradient">{currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </Card>

        <Card className="wellness-card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/20">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gradient-energy">{weeklyScore}%</div>
              <div className="text-sm text-muted-foreground">Wellness Score</div>
            </div>
          </div>
        </Card>

        <Card className="wellness-card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-accent/20">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <div>
              <Badge className="streak-badge">
                Mood Detective 🕵️
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">Latest Badge</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Mood Calendar */}
      <Card className="wellness-card">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">This Week's Mood Journey</h3>
          </div>
          
          <div className="flex justify-between gap-2">
            {weekCalendar.map((day, index) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`flex-1 p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                  selectedDate === day.date
                    ? 'border-primary shadow-lg'
                    : 'border-transparent hover:border-primary/30'
                } ${day.hasEntry ? getMoodColor(day.mood!) : 'bg-muted/50'}`}
              >
                <div className="text-center space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">
                    {day.dayName}
                  </div>
                  <div className="text-lg font-bold">{day.day}</div>
                  {day.hasEntry && (
                    <div className="text-2xl animate-bounceIn">
                      {getMoodEmoji(day.mood!)}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Weekly Progress */}
      <Card className="wellness-card">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Weekly Wellness Progress</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mood Check-ins</span>
              <span className="font-medium">{recentMoods.length}/7 days</span>
            </div>
            <Progress value={(recentMoods.length / 7) * 100} className="h-3" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Positive Vibes</span>
              <span className="font-medium">{positiveCount}/{recentMoods.length} entries</span>
            </div>
            <Progress 
              value={recentMoods.length > 0 ? (positiveCount / recentMoods.length) * 100 : 0} 
              className="h-3"
            />
          </div>

          {moodTrend === 'positive' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10">
              <Heart className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">
                You're on a positive streak! Keep it up! 🌟
              </span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};