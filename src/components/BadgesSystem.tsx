import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Heart, Zap, Target, Calendar, Crown, Medal } from 'lucide-react';

interface BadgesSystemProps {
  currentStreak: number;
  moodEntries: Array<{ date: string; mood: string; journal?: string }>;
  gamesPlayed?: number;
  gamesWon?: number;
}

interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const BadgesSystem: React.FC<BadgesSystemProps> = ({
  currentStreak,
  moodEntries,
  gamesPlayed = 0,
  gamesWon = 0
}) => {
  const getBadges = (): BadgeType[] => {
    const positiveMoodCount = moodEntries.filter(entry => 
      ['amazing', 'excited', 'happy', 'content', 'loved', 'good'].includes(entry.mood)
    ).length;
    
    const journalEntries = moodEntries.filter(entry => entry.journal && entry.journal.length > 0).length;
    
    return [
      {
        id: 'first-checkin',
        name: 'First Steps',
        description: 'Completed your first mood check-in',
        icon: <Star className="h-5 w-5" />,
        earned: moodEntries.length >= 1,
        progress: Math.min(moodEntries.length, 1),
        maxProgress: 1,
        rarity: 'common'
      },
      {
        id: 'streak-warrior',
        name: 'Streak Warrior',
        description: 'Maintained a 7-day streak',
        icon: <Zap className="h-5 w-5" />,
        earned: currentStreak >= 7,
        progress: Math.min(currentStreak, 7),
        maxProgress: 7,
        rarity: 'rare'
      },
      {
        id: 'positivity-champion',
        name: 'Positivity Champion',
        description: 'Logged 10 positive moods',
        icon: <Heart className="h-5 w-5" />,
        earned: positiveMoodCount >= 10,
        progress: Math.min(positiveMoodCount, 10),
        maxProgress: 10,
        rarity: 'epic'
      },
      {
        id: 'journal-master',
        name: 'Journal Master',
        description: 'Written 15 journal entries',
        icon: <Target className="h-5 w-5" />,
        earned: journalEntries >= 15,
        progress: Math.min(journalEntries, 15),
        maxProgress: 15,
        rarity: 'rare'
      },
      {
        id: 'monthly-champion',
        name: 'Monthly Champion',
        description: 'Checked in for 30 days',
        icon: <Calendar className="h-5 w-5" />,
        earned: moodEntries.length >= 30,
        progress: Math.min(moodEntries.length, 30),
        maxProgress: 30,
        rarity: 'legendary'
      },
      {
        id: 'wellness-king',
        name: 'Wellness Royalty',
        description: 'Maintained a 30-day streak',
        icon: <Crown className="h-5 w-5" />,
        earned: currentStreak >= 30,
        progress: Math.min(currentStreak, 30),
        maxProgress: 30,
        rarity: 'legendary'
      },
      {
        id: 'gamer',
        name: 'Gamer',
        description: 'Played 5 wellness games',
        icon: <Medal className="h-5 w-5" />,
        earned: gamesPlayed >= 5,
        progress: Math.min(gamesPlayed, 5),
        maxProgress: 5,
        rarity: 'common'
      },
      {
        id: 'game-master',
        name: 'Game Master',
        description: 'Won 10 games',
        icon: <Trophy className="h-5 w-5" />,
        earned: gamesWon >= 10,
        progress: Math.min(gamesWon, 10),
        maxProgress: 10,
        rarity: 'epic'
      }
    ];
  };

  const badges = getBadges();
  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned && badge.progress > 0);
  const lockedBadges = badges.filter(badge => !badge.earned && badge.progress === 0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-muted-foreground text-muted-foreground';
      case 'rare': return 'border-primary text-primary';
      case 'epic': return 'border-accent text-accent';
      case 'legendary': return 'border-gold text-gold bg-gold/10';
      default: return 'border-muted-foreground text-muted-foreground';
    }
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-muted/20 to-muted/10';
      case 'rare': return 'from-primary/20 to-primary/10';
      case 'epic': return 'from-accent/20 to-accent/10';
      case 'legendary': return 'from-gold/20 to-gold/10';
      default: return 'from-muted/20 to-muted/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gradient flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6" />
          Achievement Badges
        </h2>
        <p className="text-muted-foreground">Celebrate your wellness journey! 🏆</p>
        <div className="flex justify-center gap-4 text-sm">
          <Badge variant="secondary">{earnedBadges.length} Earned</Badge>
          <Badge variant="outline">{inProgressBadges.length} In Progress</Badge>
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-gold" />
            Earned Badges
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <Card key={badge.id} className={`wellness-card border-2 ${getRarityColor(badge.rarity)} relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGradient(badge.rarity)} opacity-50`} />
                <div className="relative p-4 text-center space-y-3">
                  <div className="flex justify-center">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${getRarityGradient(badge.rarity)} border-2 ${getRarityColor(badge.rarity)}`}>
                      {badge.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {badge.rarity.toUpperCase()}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Badges */}
      {inProgressBadges.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            In Progress
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressBadges.map((badge) => (
              <Card key={badge.id} className="wellness-card">
                <div className="p-4 text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-muted/20 border-2 border-muted">
                      {badge.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                    <div className="space-y-1">
                      <Progress 
                        value={(badge.progress / badge.maxProgress) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {badge.progress}/{badge.maxProgress}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {badge.rarity.toUpperCase()}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges Preview */}
      {lockedBadges.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-muted-foreground">
            🔒 Locked Badges
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {lockedBadges.slice(0, 4).map((badge) => (
              <Card key={badge.id} className="wellness-card opacity-50">
                <div className="p-3 text-center space-y-2">
                  <div className="flex justify-center">
                    <div className="p-2 rounded-full bg-muted/20 border border-muted">
                      {badge.icon}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">???</h5>
                    <Badge variant="outline" className="text-xs">
                      {badge.rarity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgesSystem;