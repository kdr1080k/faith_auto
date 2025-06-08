import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BrowseCars from "@/pages/BrowseCars";
import CarDetail from "@/pages/CarDetail";
import SubscriptionCarDetail from "@/pages/SubscriptionCarDetail";
import Smart from "@/pages/Smart";
import About from "@/pages/About";
import Help from "@/pages/Help";
import Contact from "@/pages/Contact";
import WhySubscription from "@/pages/WhySubscription";
import LongTermRental from "@/pages/LongTermRental";
import SecondHandCars from "@/pages/SecondHandCars";
import Layout from "@/components/layout/Layout";
import Enquiry from "@/pages/Enquiry";
import FAQ from "@/pages/FAQ";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/browse-cars" component={BrowseCars} />
      <Route path="/car/:id" component={CarDetail} />
      <Route path="/subscription-car/:id" component={SubscriptionCarDetail} />
      <Route path="/smart" component={Smart} />
      <Route path="/about" component={About} />
      <Route path="/help" component={Help} />
      <Route path="/contact" component={Contact} />
      <Route path="/subscription" component={WhySubscription} />
      <Route path="/second-hand-cars" component={SecondHandCars} />
      <Route path="/long-term-rental" component={LongTermRental} />
      <Route path="/enquiry" component={Enquiry} />
      <Route path="/faq" component={FAQ} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Layout>
          <Router />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
