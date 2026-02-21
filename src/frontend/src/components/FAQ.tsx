import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'Do I need programming experience to start?',
    answer: 'No! GoCode Zone is designed for complete beginners. We start with the basics and gradually build up your skills. If you can use a computer, you can learn Go with us.',
  },
  {
    question: 'How long does it take to complete the course?',
    answer: 'At your own pace, most students complete the core curriculum in 4-8 weeks. We provide weekly quizzes and tests to help you track your progress and stay motivated.',
  },
  {
    question: 'What makes Go a good language to learn?',
    answer: 'Go is simple, fast, and highly sought after by employers. It\'s used by companies like Google, Uber, and Docker. Its clean syntax makes it perfect for beginners, while its performance makes it powerful for professionals.',
  },
  {
    question: 'Is the Discord community active?',
    answer: 'Absolutely! Our Discord community is active 24/7 with students and mentors ready to help. You\'ll find study groups, coding challenges, and regular events to keep you engaged.',
  },
  {
    question: 'What\'s included in VIP membership?',
    answer: 'VIP members get private help from experienced Go developers, access to advanced lessons and real-world projects, priority support, and exclusive resources not available to free members.',
  },
];

export default function FAQ() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about GoCode Zone
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
