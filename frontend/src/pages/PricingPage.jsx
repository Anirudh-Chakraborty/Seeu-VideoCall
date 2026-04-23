import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronLeft } from 'lucide-react';

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-16 pb-24">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Flexible Plans for Every Team</h1>
          <p className="text-lg text-muted-foreground">
            Whether you're hosting quick 1-on-1s or massive town halls, we have a plan built for your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <Card className="flex flex-col relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>Perfect for personal use and small groups.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-extrabold">Free</span>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Up to 40 minutes per meeting</li>
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> 100 Participants</li>
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Basic Screen Sharing</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="flex flex-col border-primary/50 shadow-xl shadow-primary/10 relative scale-105 z-10">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-xs font-semibold">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For growing teams and daily collaboration.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-extrabold">$15</span>
                <span className="text-muted-foreground ml-1">/mo per user</span>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Unlimited meeting duration</li>
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> 300 Participants</li>
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Cloud Recording (5GB)</li>
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Co-hosting capabilities</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Upgrade to Pro</Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Business</CardTitle>
              <CardDescription>Advanced features for scaling organizations.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-extrabold">$25</span>
                <span className="text-muted-foreground ml-1">/mo per user</span>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Up to 1000 Participants</li>
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Unlimited Cloud Storage</li>
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Single Sign-On (SSO)</li>
                <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Dedicated Support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
