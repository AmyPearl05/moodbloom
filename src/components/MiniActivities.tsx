import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wind, PenTool, Heart, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

interface MiniActivitiesProps {
  onActivityComplete?: (activity: string) => void;
}

const MiniActivities: React.FC<MiniActivitiesProps> = ({ onActivityComplete }) => {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [completedToday, setCompletedToday] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gradient flex items-center justify-center gap-2">
          <Heart className="h-6 w-6" />
          Mini Wellness Activities
        </h2>
        <p className="text-muted-foreground">Quick activities to boost your mood! ✨</p>
        <Badge variant="secondary" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          {completedToday.length} completed today
        </Badge>
      </div>

      {!activeActivity ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ActivityCard
            id="breathing"
            title="Breathing Exercise"
            description="4-7-8 breathing technique"
            emoji="🫁"
            duration="2 min"
            completed={completedToday.includes('breathing')}
            onStart={() => setActiveActivity('breathing')}
          />
          <ActivityCard
            id="gratitude"
            title="Gratitude Prompt"
            description="Reflect on good things"
            emoji="🙏"
            duration="3 min"
            completed={completedToday.includes('gratitude')}
            onStart={() => setActiveActivity('gratitude')}
          />
          <ActivityCard
            id="affirmation"
            title="Positive Affirmations"
            description="Boost your confidence"
            emoji="💪"
            duration="2 min"
            completed={completedToday.includes('affirmation')}
            onStart={() => setActiveActivity('affirmation')}
          />
          <ActivityCard
            id="mindfulness"
            title="Mindful Moment"
            description="5-4-3-2-1 grounding"
            emoji="🧘"
            duration="3 min"
            completed={completedToday.includes('mindfulness')}
            onStart={() => setActiveActivity('mindfulness')}
          />
          <ActivityCard
            id="visualization"
            title="Happy Place"
            description="Visualize your calm space"
            emoji="🌅"
            duration="4 min"
            completed={completedToday.includes('visualization')}
            onStart={() => setActiveActivity('visualization')}
          />
          <ActivityCard
            id="stretch"
            title="Desk Stretch"
            description="Quick body movement"
            emoji="🤸"
            duration="2 min"
            completed={completedToday.includes('stretch')}
            onStart={() => setActiveActivity('stretch')}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {activeActivity === 'breathing' && '🫁 Breathing Exercise'}
              {activeActivity === 'gratitude' && '🙏 Gratitude Prompt'}
              {activeActivity === 'affirmation' && '💪 Positive Affirmations'}
              {activeActivity === 'mindfulness' && '🧘 Mindful Moment'}
              {activeActivity === 'visualization' && '🌅 Happy Place'}
              {activeActivity === 'stretch' && '🤸 Desk Stretch'}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveActivity(null)}
            >
              Back to Activities
            </Button>
          </div>

          {activeActivity === 'breathing' && (
            <BreathingExercise
              onComplete={() => {
                setCompletedToday(prev => [...prev, 'breathing']);
                onActivityComplete?.('breathing');
                setActiveActivity(null);
              }}
            />
          )}

          {activeActivity === 'gratitude' && (
            <GratitudePrompt
              onComplete={() => {
                setCompletedToday(prev => [...prev, 'gratitude']);
                onActivityComplete?.('gratitude');
                setActiveActivity(null);
              }}
            />
          )}

          {activeActivity === 'affirmation' && (
            <AffirmationActivity
              onComplete={() => {
                setCompletedToday(prev => [...prev, 'affirmation']);
                onActivityComplete?.('affirmation');
                setActiveActivity(null);
              }}
            />
          )}

          {activeActivity === 'mindfulness' && (
            <MindfulnessActivity
              onComplete={() => {
                setCompletedToday(prev => [...prev, 'mindfulness']);
                onActivityComplete?.('mindfulness');
                setActiveActivity(null);
              }}
            />
          )}

          {activeActivity === 'visualization' && (
            <VisualizationActivity
              onComplete={() => {
                setCompletedToday(prev => [...prev, 'visualization']);
                onActivityComplete?.('visualization');
                setActiveActivity(null);
              }}
            />
          )}

          {activeActivity === 'stretch' && (
            <StretchActivity
              onComplete={() => {
                setCompletedToday(prev => [...prev, 'stretch']);
                onActivityComplete?.('stretch');
                setActiveActivity(null);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

const ActivityCard: React.FC<{
  id: string;
  title: string;
  description: string;
  emoji: string;
  duration: string;
  completed: boolean;
  onStart: () => void;
}> = ({ title, description, emoji, duration, completed, onStart }) => (
  <Card className={`wellness-card group hover:scale-105 transition-transform ${completed ? 'bg-success/5 border-success/20' : ''}`}>
    <div className="text-center space-y-4">
      <div className="relative">
        <div className="text-4xl">{emoji}</div>
        {completed && (
          <div className="absolute -top-2 -right-2">
            <CheckCircle className="h-6 w-6 text-success fill-success/20" />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Badge variant="outline" className="mt-2 text-xs">{duration}</Badge>
      </div>
      <Button 
        onClick={onStart} 
        className="w-full"
        variant={completed ? "secondary" : "default"}
      >
        {completed ? 'Restart' : 'Start'}
      </Button>
    </div>
  </Card>
);

const BreathingExercise: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [isActive, setIsActive] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  
  const phases = {
    inhale: { duration: 4, next: 'hold', text: 'Breathe In' },
    hold: { duration: 7, next: 'exhale', text: 'Hold' },
    exhale: { duration: 8, next: 'pause', text: 'Breathe Out' },
    pause: { duration: 2, next: 'inhale', text: 'Pause' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      const currentPhase = phases[phase];
      const nextPhase = currentPhase.next as keyof typeof phases;
      
      if (phase === 'pause') {
        setCycle(prev => prev + 1);
        if (cycle >= 3) {
          setIsActive(false);
          onComplete();
          return;
        }
      }
      
      setPhase(nextPhase);
      setTimeLeft(phases[nextPhase].duration);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, cycle, onComplete]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimeLeft(4);
    setCycle(0);
  };

  return (
    <Card className="wellness-card">
      <div className="text-center space-y-6 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">4-7-8 Breathing</h3>
          <p className="text-sm text-muted-foreground">
            Inhale for 4, hold for 7, exhale for 8. Complete 4 cycles.
          </p>
        </div>

        <div className="space-y-4">
          <div className={`w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
            phase === 'inhale' ? 'border-primary bg-primary/10 scale-110' :
            phase === 'hold' ? 'border-accent bg-accent/10 scale-110' :
            phase === 'exhale' ? 'border-success bg-success/10 scale-90' :
            'border-muted bg-muted/10'
          }`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft}</div>
              <div className="text-sm">{phases[phase].text}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Cycle {cycle + 1}/4</span>
              <span>{Math.round((cycle / 4) * 100)}%</span>
            </div>
            <Progress value={(cycle / 4) * 100} />
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          {!isActive ? (
            <Button onClick={startExercise} className="gap-2">
              <Play className="h-4 w-4" />
              Start Breathing
            </Button>
          ) : (
            <Button onClick={() => setIsActive(false)} variant="outline" className="gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const GratitudePrompt: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [responses, setResponses] = useState<string[]>(['', '', '']);
  const prompts = [
    "What made you smile today?",
    "Who are you grateful for and why?",
    "What's one small thing that brought you joy?"
  ];

  const handleResponseChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const isComplete = responses.every(response => response.trim().length > 0);

  return (
    <Card className="wellness-card">
      <div className="space-y-6 p-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Gratitude Reflection</h3>
          <p className="text-sm text-muted-foreground">
            Take a moment to reflect on the good things in your life 🙏
          </p>
        </div>

        <div className="space-y-4">
          {prompts.map((prompt, index) => (
            <div key={index} className="space-y-2">
              <label className="text-sm font-medium">{prompt}</label>
              <textarea
                className="w-full p-3 rounded-lg border border-border bg-background resize-none"
                rows={2}
                placeholder="Write your thoughts..."
                value={responses[index]}
                onChange={(e) => handleResponseChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <Button 
          onClick={onComplete} 
          disabled={!isComplete}
          className="w-full"
        >
          Complete Gratitude Practice
        </Button>
      </div>
    </Card>
  );
};

const AffirmationActivity: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const affirmations = [
    "I am capable of handling whatever comes my way",
    "I choose to focus on what I can control",
    "I am worthy of love and respect",
    "I am growing stronger every day",
    "I trust in my ability to make good decisions",
    "I am enough, just as I am",
    "I deserve happiness and peace",
    "I have the power to create positive change"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      if (currentIndex < affirmations.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setTimeLeft(10);
      } else {
        setIsActive(false);
        onComplete();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentIndex, onComplete]);

  return (
    <Card className="wellness-card">
      <div className="text-center space-y-6 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Positive Affirmations</h3>
          <p className="text-sm text-muted-foreground">
            Repeat each affirmation and let it sink in 💪
          </p>
        </div>

        <div className="space-y-4">
          <div className="min-h-24 flex items-center justify-center p-4 bg-gradient-wellness rounded-xl">
            <p className="text-lg font-medium text-center">
              "{affirmations[currentIndex]}"
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Affirmation {currentIndex + 1}/{affirmations.length}</span>
              <span>{timeLeft}s</span>
            </div>
            <Progress value={((currentIndex + (10 - timeLeft) / 10) / affirmations.length) * 100} />
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          {!isActive ? (
            <Button onClick={() => { setIsActive(true); setTimeLeft(10); }} className="gap-2">
              <Play className="h-4 w-4" />
              Start Affirmations
            </Button>
          ) : (
            <Button onClick={() => setIsActive(false)} variant="outline" className="gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const MindfulnessActivity: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { sense: "See", prompt: "Name 5 things you can see around you", count: 5 },
    { sense: "Touch", prompt: "Name 4 things you can touch", count: 4 },
    { sense: "Hear", prompt: "Name 3 things you can hear", count: 3 },
    { sense: "Smell", prompt: "Name 2 things you can smell", count: 2 },
    { sense: "Taste", prompt: "Name 1 thing you can taste", count: 1 }
  ];

  const [responses, setResponses] = useState<string[]>([]);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setResponses([]);
    } else {
      onComplete();
    }
  };

  const addResponse = (response: string) => {
    if (response.trim() && responses.length < steps[step].count) {
      setResponses([...responses, response.trim()]);
    }
  };

  return (
    <Card className="wellness-card">
      <div className="space-y-6 p-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">5-4-3-2-1 Grounding</h3>
          <p className="text-sm text-muted-foreground">
            Ground yourself in the present moment 🧘
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl mb-2">
              {step === 0 && '👁️'}
              {step === 1 && '✋'}
              {step === 2 && '👂'}
              {step === 3 && '👃'}
              {step === 4 && '👅'}
            </div>
            <h4 className="text-lg font-semibold">{steps[step].sense}</h4>
            <p className="text-sm text-muted-foreground">{steps[step].prompt}</p>
          </div>

          <div className="space-y-2">
            {responses.map((response, index) => (
              <div key={index} className="p-2 bg-muted/20 rounded-lg text-sm">
                {index + 1}. {response}
              </div>
            ))}
          </div>

          {responses.length < steps[step].count && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={`Item ${responses.length + 1}...`}
                className="flex-1 p-2 rounded-lg border border-border bg-background"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addResponse(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          )}

          <Progress value={((step + responses.length / steps[step].count) / steps.length) * 100} />
        </div>

        {responses.length === steps[step].count && (
          <Button onClick={nextStep} className="w-full">
            {step < steps.length - 1 ? 'Next Sense' : 'Complete Practice'}
          </Button>
        )}
      </div>
    </Card>
  );
};

const VisualizationActivity: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);

  const phases = [
    {
      title: "Find Your Space",
      instruction: "Close your eyes and imagine a place where you feel completely safe and peaceful...",
      duration: 30
    },
    {
      title: "Engage Your Senses",
      instruction: "What do you see, hear, smell, and feel in this peaceful place?",
      duration: 45
    },
    {
      title: "Embrace the Feeling", 
      instruction: "Let the feeling of peace and safety wash over you completely...",
      duration: 30
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      if (phase < phases.length - 1) {
        setPhase(prev => prev + 1);
        setTimeLeft(phases[phase + 1].duration);
      } else {
        setIsActive(false);
        onComplete();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, onComplete]);

  const start = () => {
    setIsActive(true);
    setPhase(0);
    setTimeLeft(phases[0].duration);
  };

  return (
    <Card className="wellness-card">
      <div className="text-center space-y-6 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Happy Place Visualization</h3>
          <p className="text-sm text-muted-foreground">
            Visualize your perfect peaceful place 🌅
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-gradient-calm rounded-xl">
            <h4 className="text-lg font-semibold mb-3">{phases[phase].title}</h4>
            <p className="text-sm leading-relaxed">{phases[phase].instruction}</p>
          </div>

          {isActive && (
            <div className="space-y-2">
              <div className="text-2xl font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
              <Progress value={((phases[phase].duration - timeLeft) / phases[phase].duration) * 100} />
              <div className="text-sm text-muted-foreground">
                Phase {phase + 1} of {phases.length}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-center">
          {!isActive ? (
            <Button onClick={start} className="gap-2">
              <Play className="h-4 w-4" />
              Begin Visualization
            </Button>
          ) : (
            <Button onClick={() => setIsActive(false)} variant="outline" className="gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const StretchActivity: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const stretches = [
    { name: "Neck Rolls", instruction: "Slowly roll your neck in circles, 5 times each direction", duration: 20 },
    { name: "Shoulder Shrugs", instruction: "Lift shoulders to ears, hold 5 seconds, release. Repeat 5 times", duration: 25 },
    { name: "Wrist Circles", instruction: "Rotate wrists in circles, 10 times each direction", duration: 15 },
    { name: "Side Stretch", instruction: "Reach one arm overhead and lean to the side. Switch sides", duration: 20 },
    { name: "Spinal Twist", instruction: "Sit tall and gently twist your torso left and right", duration: 20 }
  ];

  const [currentStretch, setCurrentStretch] = useState(0);
  const [timeLeft, setTimeLeft] = useState(stretches[0].duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      if (currentStretch < stretches.length - 1) {
        setCurrentStretch(prev => prev + 1);
        setTimeLeft(stretches[currentStretch + 1].duration);
      } else {
        setIsActive(false);
        onComplete();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentStretch, onComplete]);

  return (
    <Card className="wellness-card">
      <div className="text-center space-y-6 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Desk Stretches</h3>
          <p className="text-sm text-muted-foreground">
            Quick stretches to release tension 🤸
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-energy rounded-xl">
            <h4 className="text-lg font-semibold">{stretches[currentStretch].name}</h4>
            <p className="text-sm mt-2">{stretches[currentStretch].instruction}</p>
          </div>

          {isActive && (
            <div className="space-y-2">
              <div className="text-3xl font-bold">{timeLeft}s</div>
              <Progress value={((stretches[currentStretch].duration - timeLeft) / stretches[currentStretch].duration) * 100} />
              <div className="text-sm text-muted-foreground">
                Stretch {currentStretch + 1} of {stretches.length}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-center">
          {!isActive ? (
            <Button onClick={() => { setIsActive(true); setTimeLeft(stretches[currentStretch].duration); }} className="gap-2">
              <Play className="h-4 w-4" />
              Start Stretching
            </Button>
          ) : (
            <Button onClick={() => setIsActive(false)} variant="outline" className="gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MiniActivities;