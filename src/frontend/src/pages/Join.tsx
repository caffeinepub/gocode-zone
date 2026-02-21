import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { SiDiscord } from 'react-icons/si';
import { CheckCircle2, Users, MessageCircle, Calendar, Shield } from 'lucide-react';

export default function Join() {
  const communityFeatures = [
    {
      icon: Users,
      title: 'Active Community',
      description: '24/7 support from fellow learners and experienced mentors',
    },
    {
      icon: MessageCircle,
      title: 'Live Help',
      description: 'Get your questions answered in real-time by the community',
    },
    {
      icon: Calendar,
      title: 'Regular Events',
      description: 'Weekly coding challenges, study groups, and live sessions',
    },
    {
      icon: Shield,
      title: 'Safe Space',
      description: 'Friendly, inclusive environment for learners of all levels',
    },
  ];

  const steps = [
    'Click the "Join Our Discord" button below',
    'Create a Discord account if you don\'t have one (it\'s free!)',
    'Accept the invite and join the GoCode Zone server',
    'Introduce yourself in the #introductions channel',
    'Check out the #getting-started channel for your first steps',
    'Start learning and connect with the community!',
  ];

  const rules = [
    'Be respectful and supportive to all members',
    'No spam, self-promotion, or off-topic content',
    'Ask questions - there are no "dumb" questions here',
    'Share your progress and help others when you can',
    'Follow Discord\'s Terms of Service and Community Guidelines',
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-go-blue/10">
                <SiDiscord className="h-16 w-16 text-go-blue" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Discord Community</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with thousands of Go learners, get help, share your progress, and grow together
            </p>
            <Button size="lg" className="text-lg px-8" asChild>
              <a
                href="https://discord.gg/your-invite-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiDiscord className="mr-2 h-5 w-5" />
                Join Our Discord
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Get</h2>
            <p className="text-lg text-muted-foreground">
              More than just a chat server - a complete learning ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {communityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-go-blue/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-lg bg-go-blue/10">
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

      {/* What Happens After Joining */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What Happens After You Join?</h2>
            <Card className="border-2">
              <CardContent className="pt-6">
                <ol className="space-y-4">
                  {steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-go-blue text-white font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-lg pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Rules */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Community Rules</h2>
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Keep GoCode Zone a Great Place to Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-go-blue mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Thousands of learners are already inside. Don't learn alone - join the community today!
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <a
              href="https://discord.gg/your-invite-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiDiscord className="mr-2 h-5 w-5" />
              Join Our Discord
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
