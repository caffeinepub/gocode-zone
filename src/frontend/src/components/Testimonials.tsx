import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Computer Science Student',
    content: 'GoCode Zone made learning Go so much easier! The structured lessons and supportive community helped me land my first internship.',
    initials: 'AC',
  },
  {
    name: 'Sarah Johnson',
    role: 'Career Switcher',
    content: 'I came from a non-tech background and the beginner-friendly approach was exactly what I needed. The weekly quizzes kept me accountable.',
    initials: 'SJ',
  },
  {
    name: 'Mike Rodriguez',
    role: 'Backend Developer',
    content: 'The coding challenges are practical and fun. I learned Go in just a few weeks and now use it daily at work!',
    initials: 'MR',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of learners who have transformed their careers with GoCode Zone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 hover:border-go-blue/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12 bg-go-blue text-white">
                    <AvatarFallback className="bg-go-blue text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
