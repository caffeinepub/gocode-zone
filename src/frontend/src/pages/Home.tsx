import { Link } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, Trophy, Code2, Users } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import AnnouncementsList from '../components/AnnouncementsList';

export default function Home() {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Beginner-friendly lessons',
      description: 'Start from zero and build your skills step by step with clear, easy-to-follow lessons.',
    },
    {
      icon: Trophy,
      title: 'Weekly quizzes & tests',
      description: 'Track your progress and reinforce your learning with regular assessments.',
    },
    {
      icon: Code2,
      title: 'Coding challenges',
      description: 'Apply what you learn with hands-on coding challenges that build real skills.',
    },
    {
      icon: Users,
      title: 'Supportive community',
      description: 'Join a vibrant Discord community of learners and mentors ready to help.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10" />
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to <span className="text-go-blue">GoCode Zone</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Learn Go from Beginner to Advanced
              </p>
              <p className="text-lg text-muted-foreground">
                Join our community and master one of the most powerful programming languages. 
                Whether you're a complete beginner or looking to level up, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/join">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                    Join Discord
                  </Button>
                </Link>
                <Link to="/course">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                    View Course
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-gopher.dim_1200x400.png"
                alt="Go Gopher mascot"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Announcements</h2>
              <p className="text-lg text-muted-foreground">
                Stay updated with the latest news and updates
              </p>
            </div>
            <AnnouncementsList />
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join GoCode Zone?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to become a confident Go developer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-2 hover:border-go-blue/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-lg bg-go-blue/10">
                        <Icon className="h-8 w-8 text-go-blue" />
                      </div>
                      <h3 className="text-xl font-semibold">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Go Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community today and get access to structured lessons, coding challenges, and a supportive network of learners.
          </p>
          <Link to="/join">
            <Button size="lg" className="text-lg px-8">
              Join Discord Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
