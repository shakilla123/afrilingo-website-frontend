
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const courses = [
  {
    id: 1,
    title: "Swahili for Beginners",
    description: "Learn the most widely spoken language in East Africa with interactive lessons and cultural context.",
    level: "Beginner",
    duration: "8 weeks",
    students: "12,543",
    rating: 4.8,
    price: "Free",
    image: "photo-1466721591366-2d5fba72006d",
    flag: "🇹🇿",
    country: "Tanzania, Kenya, Uganda"
  },
  {
    id: 2,
    title: "Yoruba Essentials",
    description: "Discover the rich language and culture of the Yoruba people of West Africa.",
    level: "Beginner",
    duration: "6 weeks",
    students: "8,721",
    rating: 4.7,
    price: "$29",
    image: "photo-1493962853295-0fd70327578a",
    flag: "🇳🇬",
    country: "Nigeria, Benin, Togo"
  },
  {
    id: 3,
    title: "Amharic Fundamentals",
    description: "Master the official language of Ethiopia with its unique script and cultural significance.",
    level: "Beginner",
    duration: "10 weeks",
    students: "5,432",
    rating: 4.9,
    price: "$39",
    image: "photo-1618160702438-9b02ab6515c9",
    flag: "🇪🇹",
    country: "Ethiopia"
  },
  {
    id: 4,
    title: "Zulu Language Journey",
    description: "Explore one of South Africa's most beautiful languages with native speaker guidance.",
    level: "Intermediate",
    duration: "12 weeks",
    students: "6,789",
    rating: 4.6,
    price: "$49",
    image: "photo-1721322800607-8c38375eef04",
    flag: "🇿🇦",
    country: "South Africa"
  }
];

const CourseSection = () => {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore African Languages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive collection of African language courses, each designed to immerse you in the culture and communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg h-48">
                  <img
                    src={`https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=400&h=300`}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${course.price === 'Free' ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                      {course.price}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="text-2xl">{course.flag}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                
                <div className="text-xs text-gray-500 mb-4">
                  Spoken in: {course.country}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-orange-500 text-orange-600 hover:bg-orange-50">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
