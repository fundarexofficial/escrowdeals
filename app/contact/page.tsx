"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - for now just redirect to Telegram
    window.open("https://t.me/Fundarex", "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant help from our finance specialists",
      action: "Start Chat",
      link: "https://t.me/Fundarex",
      available: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed inquiries about enterprise solutions",
      action: "Send Email",
      link: "mailto:support@escrowddeals.com",
      available: "Response within 2 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our account managers",
      action: "Call Now",
      link: "tel:+1234567890",
      available: "Business Hours"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Our Finance Experts
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Need help with payment accounts, escrow services, or enterprise solutions? Our team of finance specialists is here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Company
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Subject *
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="Tell us about your specific needs..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-slate-800 bg-slate-900/50 backdrop-blur hover:bg-slate-800/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                      <p className="text-slate-400 mb-3">{method.description}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                        <Clock className="w-4 h-4" />
                        {method.available}
                      </div>
                      <Link href={method.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                          {method.action}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Additional Info */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Why Contact Us?</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>Expert guidance on payment account selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>Custom enterprise solutions and pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>Technical integration support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>Compliance and security consultations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>24/7 priority support for enterprise clients</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Common Questions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">How quickly can you deliver accounts?</h4>
                  <p className="text-slate-400">Most accounts are delivered within 1-10 minutes. Enterprise bulk orders may take 24-48 hours for verification.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Do you support international clients?</h4>
                  <p className="text-slate-400">Yes, we serve clients in 30+ countries with local compliance support and multi-currency options.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">What's your refund policy?</h4>
                  <p className="text-slate-400">We offer 30-90 day money-back guarantees depending on the account tier. Enterprise clients get custom SLAs.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Can you help with integration?</h4>
                  <p className="text-slate-400">Yes, our technical team provides API integration support and custom webhook implementations.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
