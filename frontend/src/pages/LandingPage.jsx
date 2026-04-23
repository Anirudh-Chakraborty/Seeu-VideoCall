import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Video, Keyboard, Users, Shield, Zap, Globe } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState('');

  const createMeeting = () => {
    const id = Math.random().toString(36).substring(2, 10);
    navigate(`/room/${id}`);
  };

  const joinMeeting = (e) => {
    e.preventDefault();
    if (meetingId.trim()) {
      navigate(`/room/${meetingId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <nav className="fixed top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer font-bold text-xl tracking-tighter" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            SeeU
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Meetings</a>
            <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/pricing')}>Plans</span>
            <a href="#" className="hover:text-foreground transition-colors">Solutions</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            <Button onClick={createMeeting}>New Meeting</Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mt-16 lg:mt-24">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Meet Instantly,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-primary">Talk Seamlessly</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              High-definition video conferencing for the modern age. Designed for focus, clarity, and connection. No downloads. No friction.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base shadow-lg hover:shadow-primary/25 transition-all" onClick={createMeeting}>
                <Video className="mr-2 h-5 w-5" />
                Start a meeting
              </Button>
              
              <div className="w-full sm:w-auto relative flex items-center">
                <form onSubmit={joinMeeting} className="flex gap-2 w-full">
                  <div className="relative flex-1">
                    <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="Enter a code or link" 
                      className="pl-10 h-12 text-base w-full min-w-[240px]"
                      value={meetingId}
                      onChange={(e) => setMeetingId(e.target.value)}
                    />
                  </div>
                  <Button variant="secondary" size="lg" className="h-12 px-6" type="submit" disabled={!meetingId}>
                    Join
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-muted-foreground">
              <a href="#" className="underline underline-offset-4 hover:text-foreground">Learn more</a> about SeeU for free
            </div>
          </div>

          <div className="mt-32 max-w-7xl mx-auto">
             <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Long Distance Feels Small</h3>
                  <p className="text-muted-foreground">Experience zero-latency global connectivity that bridges physical distance with absolute clarity.</p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Help Ideas Take Shape</h3>
                  <p className="text-muted-foreground">Real-time collaboration tools that recede into the background, letting your team's creativity lead the way.</p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Get Started Instantly</h3>
                  <p className="text-muted-foreground">Generate a link and immerse yourself in the conversation immediately. Beautifully simple.</p>
                </div>
             </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto border-t py-12 text-center text-sm text-muted-foreground">
         <div className="flex items-center justify-center gap-6">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Security</a>
         </div>
      </footer>
    </div>
  );
}
