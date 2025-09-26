// LandingPage.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight, BarChart2, Cpu, Settings, Zap } from "lucide-react";

const features = [
  {
    title: "Fast & Efficient",
    description:
      "Manage all your links in one central place with lightning speed.",
    icon: <Zap className="w-6 h-6 text-indigo-500" />,
  },
  {
    title: "Customizable",
    description: "Personalize your link page to match your brand and style.",
    icon: <Settings className="w-6 h-6 text-indigo-500" />,
  },
  {
    title: "Analytics",
    description: "Track clicks, engagement, and popular links in real-time.",
    icon: <BarChart2 className="w-6 h-6 text-indigo-500" />,
  },
  {
    title: "Intuitive Dashboard",
    description:
      "Easily manage, organize, and optimize your links with a simple UI.",
    icon: <Cpu className="w-6 h-6 text-indigo-500" />,
  },
];

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-bold text-indigo-600">Lynkt</div>
        <nav className="space-x-6 hidden md:flex">
          <a href="#features" className="hover:text-indigo-500 transition">
            Features
          </a>
          <a href="#dashboard" className="hover:text-indigo-500 transition">
            Dashboard
          </a>
          <a href="#pricing" className="hover:text-indigo-500 transition">
            Pricing
          </a>
          <a href="#contact" className="hover:text-indigo-500 transition">
            Contact
          </a>
        </nav>
        <Button className="ml-4">Sign Up</Button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 bg-indigo-50">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Centralize & Manage Your Links Effortlessly
          </h1>
          <p className="text-gray-700 text-lg">
            Lynkt makes managing, sharing, and tracking your links fast,
            intuitive, and fully customizable.
          </p>
          <Button className="mt-4 px-6 py-3 text-lg flex items-center gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            Product Mockup
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">Features & Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="hover:shadow-lg transition">
              <CardHeader className="flex items-center space-x-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="px-8 py-20 bg-indigo-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Dashboard Preview</h2>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-indigo-100 rounded-lg">
              <h3 className="font-bold text-xl">Links</h3>
              <p className="text-gray-700 text-3xl mt-2">128</p>
            </div>
            <div className="p-4 bg-indigo-100 rounded-lg">
              <h3 className="font-bold text-xl">Clicks</h3>
              <p className="text-gray-700 text-3xl mt-2">4,532</p>
            </div>
            <div className="p-4 bg-indigo-100 rounded-lg">
              <h3 className="font-bold text-xl">Popular Link</h3>
              <p className="text-gray-700 text-3xl mt-2">/lynkt-home</p>
            </div>
          </div>
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            Dashboard Mockup
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="px-8 py-20 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to streamline your links?
        </h2>
        <p className="text-lg mb-6">
          Sign up today and take full control of your link management!
        </p>
        <Button className="px-6 py-3 text-lg bg-white text-indigo-600 hover:bg-gray-100">
          Get Started
        </Button>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-8 py-12 bg-white text-gray-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Lynkt. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-500 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
