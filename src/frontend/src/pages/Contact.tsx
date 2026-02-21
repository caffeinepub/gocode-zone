import ContactForm from '../components/ContactForm';
import { Card, CardContent } from '../components/ui/card';
import { Mail, MessageCircle } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have questions, feedback, or need help? We're here for you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Other Ways to Reach Us</h2>
                <p className="text-muted-foreground mb-6">
                  Choose the method that works best for you. We typically respond within 24 hours.
                </p>
              </div>

              <Card className="border-2 hover:border-go-blue/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-go-blue/10">
                      <SiDiscord className="h-6 w-6 text-go-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Discord Community</h3>
                      <p className="text-muted-foreground mb-3">
                        Join our Discord server for real-time support from the community and our team.
                      </p>
                      <a
                        href="https://discord.gg/your-invite-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-go-blue hover:underline font-medium"
                      >
                        Join Discord →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-go-blue/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-go-blue/10">
                      <Mail className="h-6 w-6 text-go-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground mb-3">
                        For general inquiries, partnerships, or detailed questions.
                      </p>
                      <a
                        href="mailto:hello@gocodezone.com"
                        className="text-go-blue hover:underline font-medium"
                      >
                        hello@gocodezone.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-go-blue/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-go-blue/10">
                      <MessageCircle className="h-6 w-6 text-go-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">VIP Support</h3>
                      <p className="text-muted-foreground mb-3">
                        VIP members get priority support in dedicated channels.
                      </p>
                      <a
                        href="/vip"
                        className="text-go-blue hover:underline font-medium"
                      >
                        Learn about VIP →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
