
"use client";

import { socialLinks } from '@/lib/data.tsx';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

export default function Contact() {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: `${type} Copied!`,
        description: `${text} has been copied to your clipboard.`,
      });
      setCopied(type);
      setTimeout(() => setCopied(null), 2000); // Reset icon after 2 seconds
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy text. Please try again.",
      });
    });
  };

  const email = "n.abashidze25@gmail.com";
  const phoneNumber = "+995 568 481 313";
  const telLink = `tel:${phoneNumber.replace(/\s/g, '')}`;


  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a project in mind or want to connect? Feel free to reach out.
            </p>
          </div>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            <div
              onClick={() => handleCopy(email, 'Email')}
              className="group flex flex-col items-center justify-center p-6 bg-background rounded-lg shadow-md hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Email</h3>
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                <p>{email}</p>
                {copied === 'Email' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </div>
            </div>
            
            <a
              href={telLink}
              onClick={(e) => {
                // On desktop, prevent default `tel:` link and copy instead
                if (window.innerWidth >= 768) {
                  e.preventDefault();
                  handleCopy(phoneNumber, 'Phone');
                }
              }}
              className="group flex flex-col items-center justify-center p-6 bg-background rounded-lg shadow-md hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Phone</h3>
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                <p>{phoneNumber}</p>
                 {copied === 'Phone' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </div>
            </a>
          </div>

          <div className="w-full max-w-md pt-8">
             <h3 className="text-xl font-semibold text-foreground mb-4">Or find me on social media</h3>
             <div className="flex justify-center space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-transform duration-300 hover:scale-110"
                  aria-label={link.name}
                >
                  <link.icon className="h-10 w-10" />
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
