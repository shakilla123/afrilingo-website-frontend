
import { 
  MessageCircle, 
  Headphones, 
  Trophy, 
  Users, 
  BookOpen, 
  Globe,
  Mic,
  Brain
} from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: "Interactive Conversations",
    description: "Practice real-world conversations with AI tutors and native speakers",
    color: "text-blue-500"
  },
  {
    icon: Headphones,
    title: "Audio Pronunciation",
    description: "Perfect your pronunciation with native speaker audio and voice recognition",
    color: "text-green-500"
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn points, unlock achievements, and compete with friends",
    color: "text-yellow-500"
  },
  {
    icon: Users,
    title: "Cultural Immersion",
    description: "Learn about traditions, customs, and cultural context alongside language",
    color: "text-purple-500"
  },
  {
    icon: BookOpen,
    title: "Comprehensive Lessons",
    description: "Structured curriculum from basics to advanced conversation skills",
    color: "text-red-500"
  },
  {
    icon: Globe,
    title: "Multiple Dialects",
    description: "Learn regional variations and dialects of each language",
    color: "text-indigo-500"
  },
  {
    icon: Mic,
    title: "Speech Recognition",
    description: "Advanced AI analyzes your pronunciation and provides instant feedback",
    color: "text-orange-500"
  },
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "Personalized learning paths that adapt to your progress and style",
    color: "text-pink-500"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Afrilingo?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the most comprehensive and engaging way to learn African languages with cutting-edge technology and cultural authenticity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Start Your African Language Journey Today
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of learners who are already connecting with African cultures through language. Get started with our free courses and unlock the beauty of African communication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Start Free Trial
                </button>
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-xl p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Globe className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-orange-100">Languages</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold">50K+</div>
                    <div className="text-orange-100">Active Learners</div>
                  </div>
                  <div>
                    <div className="font-semibold">95%</div>
                    <div className="text-orange-100">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
