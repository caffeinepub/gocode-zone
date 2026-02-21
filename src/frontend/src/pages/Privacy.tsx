import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Mail } from 'lucide-react';

export default function Privacy() {
  const effectiveDate = 'February 21, 2026';

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Effective Date */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Effective Date</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This Privacy Policy is effective as of <strong>{effectiveDate}</strong>.
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Welcome to GoCode Zone. We are committed to protecting your personal information and your right to privacy. 
                  This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
                </p>
                <p className="text-muted-foreground">
                  By using our website and services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Information You Provide</h4>
                  <p className="text-muted-foreground">
                    When you use our contact form or interact with our services, we may collect:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Your name</li>
                    <li>Email address</li>
                    <li>Messages and communications you send to us</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                  <p className="text-muted-foreground">
                    When you visit our website, we may automatically collect certain information about your device, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address</li>
                    <li>Pages visited and time spent on pages</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To improve our website and services</li>
                  <li>To send you updates about our courses and community (with your consent)</li>
                  <li>To analyze usage patterns and optimize user experience</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Storage and Security */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Data Storage and Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Your data is stored securely on the Internet Computer blockchain, which provides decentralized and 
                  tamper-resistant storage. We implement appropriate technical and organizational measures to protect 
                  your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-muted-foreground">
                  However, please note that no method of transmission over the internet or electronic storage is 100% secure. 
                  While we strive to use commercially acceptable means to protect your personal information, we cannot 
                  guarantee its absolute security.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>The right to access your personal data</li>
                  <li>The right to request correction of inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to object to processing of your data</li>
                  <li>The right to data portability</li>
                </ul>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party services, including Discord. These third-party services 
                  have their own privacy policies, and we are not responsible for their practices. We encourage you to 
                  review the privacy policies of any third-party services you access through our website.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our services are not directed to individuals under the age of 13. We do not knowingly collect personal 
                  information from children under 13. If you are a parent or guardian and believe your child has provided 
                  us with personal information, please contact us so we can delete it.
                </p>
              </CardContent>
            </Card>

            {/* Changes to This Policy */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
                  new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review 
                  this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-2 border-go-blue">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-6 w-6 text-go-blue" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> privacy@gocodezone.com
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Discord:</strong> Join our server and message the admin team
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Contact Form:</strong> Use our <a href="/contact" className="text-go-blue hover:underline">contact page</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
