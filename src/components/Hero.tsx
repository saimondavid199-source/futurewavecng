import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendLeadEmail, type LeadFormData } from "@/lib/emailjs";
import heroFuelImage from "@/assets/hero-fuel-frustration.jpg";
import heroHappyImage from "@/assets/hero-cng-happy.jpg";

export const Hero = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleMakeModel: "",
    vehicleYear: "",
    plugType: "",
    location: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.vehicleMakeModel || !formData.vehicleYear || !formData.plugType || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to download the guide.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const emailSent = await sendLeadEmail(formData as LeadFormData);
      
      if (emailSent) {
        toast({
          title: "Success!",
          description: "Your guide is downloading now. Check your email for additional resources.",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          vehicleMakeModel: "",
          vehicleYear: "",
          plugType: "",
          location: ""
        });
        
        // Trigger download
        const link = document.createElement('a');
        link.href = "/cng-conversion-guide.pdf";
        link.download = "CNG_Conversion_Guide.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast({
          title: "Error",
          description: "Failed to process your request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 relative">
          <img 
            src={heroFuelImage} 
            alt="Frustrated at fuel station" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
        <div className="w-1/2 relative">
          <img 
            src={heroHappyImage} 
            alt="Happy with CNG conversion" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - Hero Content */}
          <div className="text-white space-y-6 hero-text">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
              Fuel Is Draining Your{" "}
              <span className="text-accent">Wallet</span>.{" "}
              <span className="block mt-2">Here's The Smarter Alternative.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white leading-relaxed font-semibold drop-shadow-lg">
              Discover how over <span className="font-bold text-white">200 Nigerians</span> are saving{" "}
              <span className="font-bold text-white">50%+</span> on fuel with Futurewave CNG.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="cta" 
                size="xl" 
                className="flex-1 sm:flex-none"
                onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Download Free CNG Guide
              </Button>
              <Button variant="outline" size="xl" className="flex-1 sm:flex-none text-white border-white hover:bg-white hover:text-primary">
                Watch Success Stories
              </Button>
            </div>
          </div>
          
          {/* Right Column - Lead Form */}
          <div id="hero-form" className="lg:justify-self-end w-full max-w-md">
            <Card className="shadow-strong border-0">
              <CardContent className="p-6 space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-primary">Get Your Free CNG Guide</h3>
                  <p className="text-muted-foreground">Start saving on fuel today</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  
                  <Input
                    placeholder="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                  
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                  
                  <Input
                    placeholder="Vehicle make & model (e.g., Toyota Camry)"
                    value={formData.vehicleMakeModel}
                    onChange={(e) => setFormData({...formData, vehicleMakeModel: e.target.value})}
                    required
                  />
                  
                  <Input
                    placeholder="Vehicle year (e.g., 2018)"
                    type="number"
                    min="1980"
                    max="2025"
                    value={formData.vehicleYear}
                    onChange={(e) => setFormData({...formData, vehicleYear: e.target.value})}
                    required
                  />
                  
                  <Select value={formData.plugType} onValueChange={(value) => setFormData({...formData, plugType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Engine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4-cylinder">4 Cylinder</SelectItem>
                      <SelectItem value="6-cylinder">6 Cylinder</SelectItem>
                      <SelectItem value="8-cylinder">8 Cylinder</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="unsure">Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="kano">Kano</SelectItem>
                      <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                      <SelectItem value="ibadan">Ibadan</SelectItem>
                      <SelectItem value="benin">Benin City</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    type="submit" 
                    variant="cta" 
                    size="lg" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Download Free Guide Now"}
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground text-center">
                  No spam. Your information is 100% secure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};