import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, Crown, Zap, Users, BookOpen, Code2, MessageCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function VIP() {
  const vipFeatures = [
    {
      icon: Users,
      title: 'Private Help Sessions',
      description: 'One-on-one mentorship with experienced Go developers',
    },
    {
      icon: BookOpen,
      title: 'Advanced Lessons',
      description: 'Exclusive content on concurrency, testing, and production-ready code',
    },
    {
      icon: Code2,
      title: 'Real-World Projects',
      description: 'Build portfolio-worthy applications with guided project tutorials',
    },
    {
      icon: Zap,
      title: 'Priority Support',
      description: 'Get your questions answered first in dedicated VIP channels',
    },
    {
      icon: MessageCircle,
      title: 'VIP-Only Community',
      description: 'Network with serious learners and industry professionals',
    },
    {
      icon: Crown,
      title: 'Exclusive Resources',
      description: 'Access to code templates, cheat sheets, and premium tools',
    },
  ];

  const standardFeatures = [
    'Access to all 4 core units',
    'Weekly quizzes and tests',
    'Community Discord access',
    'Basic coding challenges',
    'Public help channels',
  ];

  const vipOnlyFeatures = [
    'Private mentorship sessions',
    'Advanced lessons (Units 5-8)',
    'Real-world project tutorials',
    'Priority support in VIP channels',
    'Exclusive code templates & resources',
    'Career guidance and resume reviews',
    'Early access to new content',
    'VIP-only networking events',
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-go-blue to-go-cyan">
                <Crown className="h-16 w-16 text-white" />
              </div>
            </div>
            <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
              Premium Membership
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">VIP Membership</h1>
            <p className="text-xl text-muted-foreground">
              Take your Go learning to the next level with exclusive content, private mentorship, and advanced projects
            </p>
          </div>
        </div>
      </section>

      {/* VIP Features */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Included in VIP</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to become a professional Go developer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vipFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-go-blue/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-go-blue/20 to-go-cyan/20">
                        <Icon className="h-8 w-8 text-go-blue" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you're ready for more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Free Membership</CardTitle>
                <div className="text-4xl font-bold mt-4">$0</div>
                <p className="text-muted-foreground">Perfect for getting started</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {standardFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-go-blue mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/join">
                  <Button variant="outline" className="w-full mt-6" size="lg">
                    Join Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* VIP Plan */}
            <Card className="border-2 border-go-blue relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-go-blue to-go-cyan text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Crown className="h-6 w-6 text-go-blue" />
                  VIP Membership
                </CardTitle>
                <div className="text-4xl font-bold mt-4">
                  $29<span className="text-xl text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Everything in Free, plus:</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {vipOnlyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-go-blue mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button className="w-full mt-6" size="lg">
                    Contact for VIP Access
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Extra Features Detail */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">VIP Extra Features</h2>
            
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-go-blue" />
                    Private Help & Mentorship
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get personalized guidance from experienced Go developers. Schedule one-on-one sessions 
                    to review your code, discuss career paths, or get help with challenging concepts. 
                    VIP members receive priority access to mentors and can book sessions at their convenience.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-go-blue" />
                    Advanced Lessons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Go beyond the basics with advanced topics like goroutines and channels, testing strategies, 
                    working with databases, building REST APIs, microservices architecture, and deployment best 
                    practices. These lessons prepare you for real-world professional development.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-6 w-6 text-go-blue" />
                    Real-World Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Build impressive portfolio projects with step-by-step guidance. Create a REST API, 
                    develop a CLI tool, build a web scraper, or construct a microservice. Each project 
                    includes complete source code, detailed explanations, and deployment instructions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Go VIP?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Invest in your future as a Go developer. Get the support, resources, and guidance you need to succeed.
          </p>
          <Link to="/contact">
            <Button size="lg" className="text-lg px-8">
              Contact Us About VIP
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
