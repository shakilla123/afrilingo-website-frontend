
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mainCourse = {
  id: 1,
  title: "Kinyarwanda for Beginners",
  description: "Learn the official language of Rwanda with interactive lessons and cultural context. Master greetings, basic conversations, and cultural insights.",
  level: "Beginner",
  duration: "12 weeks",
  students: "15,432",
  rating: 4.9,
  price: "Free",
  image: "photo-1618160702438-9b02ab6515c9",
  flag: "🇷🇼",
  country: "Rwanda"
};

const comingSoonLanguages = [
  { name: "Swahili", flag: "🇹🇿", countries: "Tanzania, Kenya, Uganda" },
  { name: "Yoruba", flag: "🇳🇬", countries: "Nigeria, Benin, Togo" },
  { name: "Amharic", flag: "🇪🇹", countries: "Ethiopia" },
  { name: "Zulu", flag: "🇿🇦", countries: "South Africa" },
  { name: "Hausa", flag: "🇳🇬", countries: "Nigeria, Niger, Chad" },
  { name: "Igbo", flag: "🇳🇬", countries: "Nigeria" },
  { name: "Xhosa", flag: "🇿🇦", countries: "South Africa" },
  { name: "Wolof", flag: "🇸🇳", countries: "Senegal, Gambia" }
];

const CourseSection = () => {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Explore African Languages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your journey with Kinyarwanda, with more African languages coming soon to immerse you in the culture and communication.
          </p>
        </div>

        {/* Main Kinyarwanda Course */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center">Available Now</h3>
          <div className="flex justify-center">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg max-w-md">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg h-48">
                  <img
                    src={`https://images.unsplash.com/${mainCourse.image}?auto=format&fit=crop&w=400&h=300`}
                    alt={mainCourse.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 text-white">
                      {mainCourse.price}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="text-2xl">{mainCourse.flag}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {mainCourse.level}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{mainCourse.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{mainCourse.description}</p>
                
                <div className="text-xs text-gray-500 mb-4">
                  Spoken in: {mainCourse.country}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{mainCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{mainCourse.students}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{mainCourse.rating}</span>
                  <span className="text-sm text-gray-500">rating</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white group">
                  Start Learning
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Coming Soon Languages */}
        <div>
          <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center">Coming Soon</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comingSoonLanguages.map((language, index) => (
              <Card key={index} className="p-4 text-center border-2 border-dashed border-gray-300 bg-gray-50">
                <div className="text-3xl mb-2">{language.flag}</div>
                <h4 className="font-semibold text-gray-700 mb-1">{language.name}</h4>
                <p className="text-xs text-gray-500">{language.countries}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  Coming Soon
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Be the first to know when new languages are available!
          </p>
          <Button variant="outline" size="lg" className="border-orange-500 text-orange-600 hover:bg-orange-50">
            Join Waitlist
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
