
import { socialLinks } from '@/lib/data';
import { Mail, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a project in mind or want to connect? Feel free to reach out. I'm always open to discussing new opportunities.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <a
              href="mailto:n.abashidze25@gmail.com"
              className="inline-flex items-center text-lg font-medium text-accent hover:underline"
            >
              <Mail className="mr-2 h-5 w-5" />
              n.abashidze25@gmail.com
            </a>
            <a
              href="tel:+995568481313"
              className="inline-flex items-center text-lg font-medium text-accent hover:underline"
            >
              <Phone className="mr-2 h-5 w-5" />
              568 481 313
            </a>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent"
                  aria-label={link.name}
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
