import { useState } from 'react';
import { useSubmitContact } from '../hooks/useQueries';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const submitContact = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await submitContact.mutateAsync({
        name: name.trim(),
        emailAddress: email.trim(),
        message: message.trim(),
      });

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
        <CardDescription>
          Have a question or feedback? We'd love to hear from you!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitContact.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitContact.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us what's on your mind..."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitContact.isPending}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={submitContact.isPending}
          >
            {submitContact.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
