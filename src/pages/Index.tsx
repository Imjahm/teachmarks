import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Marking Process
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The intelligent platform that helps teachers mark assignments faster and provide better feedback
          </p>
          <Button size="lg" className="bg-primary text-white">
            Get Started
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Fast & Accurate</h3>
            </div>
            <p className="text-gray-600">
              Our AI-powered system helps you mark assignments quickly without compromising accuracy
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Detailed Analytics</h3>
            </div>
            <p className="text-gray-600">
              Get insights into student performance and identify areas for improvement
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Time-Saving</h3>
            </div>
            <p className="text-gray-600">
              Reduce marking time by up to 50% while providing more detailed feedback
            </p>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Marking Process?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of teachers who are already saving time with our platform
          </p>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;