import { Card, CardContent } from '../components/ui/card';
import { Code2, Users, Rocket } from 'lucide-react';

export default function About() {
  const targetAudiences = [
    {
      icon: Users,
      title: 'Beginners',
      description: 'No prior programming experience? No problem! Our curriculum starts from the very basics and guides you through every step.',
    },
    {
      icon: Code2,
      title: 'Students',
      description: 'Computer science students looking to add a powerful language to their toolkit and stand out in the job market.',
    },
    {
      icon: Rocket,
      title: 'Developers',
      description: 'Experienced developers wanting to learn Go for backend development, cloud services, or system programming.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About GoCode Zone</h1>
            <p className="text-xl text-muted-foreground">
              Your gateway to mastering Go programming through structured learning and community support
            </p>
          </div>
        </div>
      </section>

      {/* What is Go Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What is Go (Golang)?</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Go, also known as Golang, is a modern programming language created by Google in 2009. 
                It was designed to be simple, efficient, and reliable, making it perfect for building 
                scalable web services, cloud applications, and system tools.
              </p>
              <p>
                Go combines the ease of programming of an interpreted, dynamically typed language with 
                the efficiency and safety of a statically typed, compiled language. It's known for its 
                fast compilation, built-in concurrency support, and clean syntax that's easy to learn.
              </p>
              <p>
                Today, Go powers some of the world's most critical infrastructure. Companies like Google, 
                Uber, Netflix, Dropbox, and Docker rely on Go for their backend systems. Learning Go 
                opens doors to exciting career opportunities in cloud computing, DevOps, and backend development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is GoCode Zone Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What is GoCode Zone?</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                GoCode Zone is a comprehensive learning platform and community dedicated to teaching Go 
                programming from the ground up. We believe that anyone can learn to code with the right 
                guidance, structure, and support.
              </p>
              <p>
                Our platform offers a carefully crafted curriculum that takes you from complete beginner 
                to confident Go developer. Each lesson is designed to be clear, practical, and engaging, 
                with hands-on coding challenges that reinforce what you learn.
              </p>
              <p>
                But we're more than just lessons. GoCode Zone is a vibrant community of learners, mentors, 
                and Go enthusiasts who support each other on their coding journey. Through our Discord 
                server, you'll find study groups, coding challenges, live help sessions, and a network 
                of peers who share your passion for learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who is GoCode Zone For?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're just starting out or looking to expand your skills, GoCode Zone has something for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {targetAudiences.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <Card key={index} className="border-2 hover:border-go-blue/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-4 rounded-lg bg-go-blue/10">
                        <Icon className="h-10 w-10 text-go-blue" />
                      </div>
                      <h3 className="text-2xl font-semibold">{audience.title}</h3>
                      <p className="text-muted-foreground">{audience.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
