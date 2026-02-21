import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, BookOpen } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '../components/ui/button';

export default function Course() {
  const units = [
    {
      number: 1,
      title: 'Getting Started',
      description: 'Begin your Go journey with the fundamentals',
      topics: [
        'Installing Go and setting up your development environment',
        'Writing your first Go program',
        'Understanding Go project structure',
        'Basic syntax and program flow',
        'Running and building Go applications',
      ],
    },
    {
      number: 2,
      title: 'Variables & Data Types',
      description: 'Master the building blocks of Go programming',
      topics: [
        'Declaring and initializing variables',
        'Understanding Go\'s type system',
        'Working with strings, numbers, and booleans',
        'Constants and their uses',
        'Type conversion and type inference',
      ],
    },
    {
      number: 3,
      title: 'If & Switch',
      description: 'Learn to control program flow with conditionals',
      topics: [
        'If statements and conditional logic',
        'Else and else-if clauses',
        'Switch statements for multiple conditions',
        'Comparison and logical operators',
        'Best practices for writing clean conditionals',
      ],
    },
    {
      number: 4,
      title: 'Loops',
      description: 'Harness the power of iteration in Go',
      topics: [
        'For loops - Go\'s only looping construct',
        'While-style loops using for',
        'Infinite loops and break statements',
        'Continue and loop control',
        'Iterating over arrays, slices, and maps',
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Course Syllabus</h1>
            <p className="text-xl text-muted-foreground mb-8">
              A structured path from beginner to confident Go developer
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-base px-4 py-2">
                4 Comprehensive Units
              </Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">
                Weekly Quizzes
              </Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">
                Big Tests Included
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Units Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {units.map((unit) => (
              <Card key={unit.number} className="border-2 hover:border-go-blue/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-go-blue text-white font-bold text-xl">
                          {unit.number}
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Unit {unit.number} – {unit.title}</CardTitle>
                          <p className="text-muted-foreground mt-1">{unit.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-go-blue" />
                        What You'll Learn:
                      </h4>
                      <ul className="space-y-2">
                        {unit.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-go-blue mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-sm">
                          ✓ Quiz Included
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                          ✓ Big Test Included
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our Discord community to get access to all course materials, quizzes, and support from fellow learners.
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
