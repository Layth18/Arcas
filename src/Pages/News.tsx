import React, { useState } from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  Sunrise,
  Sunset,
  Droplets,
  Bug,
  Heart,
  Bookmark,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const News = () => {
  const [likedNews, setLikedNews] = useState(new Set<number>());
  const [bookmarkedNews, setBookmarkedNews] = useState(new Set<number>());
  const [selectedNews, setSelectedNews] = useState<null | any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const weatherForecast = [
    { day: 'Today', icon: Sun, temp: '28°C', condition: 'Sunny' },
    { day: 'Mon', icon: Cloud, temp: '26°C', condition: 'Cloudy' },
    { day: 'Tue', icon: CloudRain, temp: '24°C', condition: 'Rain' },
    { day: 'Wed', icon: Sun, temp: '27°C', condition: 'Clear' },
  ];

  // Sample news items (shortened for brevity, can paste all your original items)
  const newsItems = [{ id: 1, title: 'Drought Warning Issued for Southern Regions', source: 'AgriWeather Network', date: '2 hours ago', summary: 'Meteorological services predict below-average rainfall for the next 30 days. Farmers advised to implement water conservation strategies and consider drought-resistant crop varieties.', fullContent: 'The National Meteorological Service has issued a Level 2 drought warning for southern agricultural regions, predicting significantly below-average rainfall over the next 30 days. Historical data shows similar patterns led to 15-20% yield reductions in the past.\n\nFarmers are strongly advised to implement immediate water conservation measures including mulching, reduced tillage practices, and switching to drip irrigation where possible. The Agricultural Extension Service recommends considering drought-resistant crop varieties for any new plantings during this period.\n\nGovernment officials have announced emergency water allocation protocols will be activated if conditions worsen. Farmers should monitor soil moisture levels daily and report any severe stress conditions to local agricultural offices for potential assistance programs.', tag: 'Regional Alert', tagColor: 'bg-orange-500', category: 'regional' }, { id: 2, title: 'New Tomato Blight Resistance Gene Discovered', source: 'Journal of Agricultural Science', date: '5 hours ago', summary: 'Researchers at the International Crop Institute have identified a gene that provides natural resistance to late blight in tomatoes, potentially reducing fungicide use by 60%.', fullContent: 'In a groundbreaking study published today, researchers at the International Crop Institute have successfully identified and isolated a gene providing natural resistance to Phytophthora infestans, the pathogen responsible for late blight in tomatoes.\n\nThe discovery, resulting from a five-year research program analyzing wild tomato species from South America, could revolutionize tomato cultivation worldwide. Field trials conducted across three continents showed that plants carrying this gene maintained 95% resistance to late blight even under high disease pressure.\n\nMost significantly, farmers using these resistant varieties reduced fungicide applications by an average of 60%, leading to substantial cost savings and environmental benefits. The research team is now working with seed companies to incorporate this trait into commercial varieties, with the first resistant seeds expected to be available to farmers within 18-24 months.', tag: 'Science', tagColor: 'bg-blue-500', category: 'science' }, { id: 3, title: 'Livestock Health Check: Foot-and-Mouth Alert', source: 'Veterinary Council', date: '8 hours ago', summary: 'Veterinarians report increased cases in neighboring districts. All livestock owners should inspect animals daily and report any suspicious symptoms immediately.', fullContent: 'The Regional Veterinary Council has issued an urgent alert following confirmed cases of Foot-and-Mouth Disease (FMD) in three neighboring districts. The outbreak, which began two weeks ago, has now affected over 200 head of cattle and shows signs of spreading.\n\nVeterinarians are urging all livestock owners to implement strict biosecurity measures immediately. This includes daily inspection of all animals for symptoms such as fever, blisters in the mouth or on feet, excessive drooling, and lameness. Any suspicious cases should be reported to the nearest veterinary office within 24 hours.\n\nMovement restrictions are now in place for livestock in affected areas. Farmers should avoid contact with animals from other farms and disinfect all equipment, vehicles, and footwear regularly. Vaccination programs are being fast-tracked, with priority given to farms in high-risk zones. The council emphasizes that early detection and rapid response are critical to containing this outbreak.', tag: 'Veterinary', tagColor: 'bg-pink-400', category: 'role' }, { id: 4, title: 'Soil Erosion Prevention Techniques Proven Effective', source: 'Geology & Agriculture Today', date: '1 day ago', summary: 'New study shows contour farming combined with cover crops reduces soil loss by 75%. Geologists recommend implementation before monsoon season.', fullContent: 'A comprehensive three-year study conducted by the National Geological Survey in partnership with agricultural universities has demonstrated that combining contour farming with strategic cover crop planting can reduce soil erosion by up to 75% on sloped farmland.\n\nThe research, which monitored 150 farms across different topographies and soil types, found that farms implementing both techniques together showed dramatically better results than those using either method alone. Contour farming redirects water flow, while cover crops like clover and rye stabilize soil with their root systems.\n\nWith monsoon season approaching, geologists are strongly recommending farmers on sloped land implement these practices immediately. The study also noted significant secondary benefits including improved water retention, increased soil organic matter, and better overall soil health. Government subsidies are available for farmers transitioning to these sustainable practices, with technical support provided by extension services.', tag: 'Geology', tagColor: 'bg-amber-600', category: 'role' }, { id: 5, title: 'Government Announces Subsidy for Drip Irrigation', source: 'Ministry of Agriculture', date: '1 day ago', summary: 'New policy provides 50% subsidy on drip irrigation systems for farms under 5 hectares. Applications open next week with simplified documentation process.', fullContent: 'The Ministry of Agriculture has announced a major new initiative to promote water-efficient farming practices through substantial subsidies for drip irrigation system installation. Under the new program, farms of 5 hectares or smaller are eligible for 50% cost coverage on approved drip irrigation equipment and installation.\n\nThis represents a significant expansion from the previous program which only covered 30% of costs and had more restrictive eligibility criteria. The ministry estimates this will help 50,000 small farmers transition to water-efficient irrigation methods over the next two years.\n\nApplications will be accepted starting next Monday through a new online portal designed for simplicity. Required documentation has been reduced to just farm ownership proof, size verification, and a basic water usage plan. The ministry has also arranged partnerships with certified installers who will provide free technical assessments and installation support for subsidy recipients. Priority processing will be given to farms in drought-prone regions.', tag: 'Regional Policy', tagColor: 'bg-orange-500', category: 'regional' }, { id: 6, title: 'Smart Sensors Reduce Water Usage by 40%', source: 'AgriTech Innovation', date: '2 days ago', summary: 'Field trials demonstrate that IoT-enabled soil moisture sensors help farmers optimize irrigation schedules, leading to significant water savings without yield reduction.', fullContent: 'A revolutionary 18-month field trial involving 200 farms has conclusively demonstrated that IoT-enabled soil moisture sensors can reduce water consumption by an average of 40% while maintaining or even improving crop yields.\n\nThe sensors, which cost approximately $200 per hectare to install, continuously monitor soil moisture at multiple depths and send real-time data to farmers\' smartphones. This allows for precision irrigation based on actual plant needs rather than fixed schedules or guesswork.\n\nParticipating farmers reported not only dramatic water savings but also unexpected benefits including reduced fertilizer runoff, lower energy costs for pumping, and improved crop quality due to optimal moisture levels. The technology proved especially valuable during the dry season when water scarcity is most acute. Several agricultural banks are now offering special loans for sensor installation, recognizing the long-term cost savings. The trial organizers estimate full investment payback typically occurs within 2-3 growing seasons.', tag: 'Technology', tagColor: 'bg-teal-500', category: 'role' }, { id: 7, title: 'Organic Pest Control Methods Gaining Popularity', source: 'Sustainable Farming Weekly', date: '2 days ago', summary: 'Farmers report success with companion planting and beneficial insects. Survey shows 65% reduction in chemical pesticide use among early adopters.', fullContent: 'A nationwide survey of 5,000 farmers reveals a major shift toward organic pest management strategies, with early adopters reporting remarkable success and significant cost savings compared to conventional chemical approaches.\n\nThe survey found that farmers using integrated pest management combining companion planting, beneficial insect release, and natural repellents achieved a 65% reduction in chemical pesticide use over two years. Key successful strategies included planting marigolds to deter aphids, releasing ladybugs for natural pest control, and using neem oil sprays for fungal issues.\n\nBeyond environmental benefits, farmers reported 30% lower pest management costs and improved soil health. Consumer demand for organically grown produce has also increased prices by 15-20% for participating farmers. Regional agricultural cooperatives are now organizing bulk purchases of beneficial insects and organic pest control supplies to reduce costs further. Training programs on organic pest management are being expanded due to overwhelming farmer interest.', tag: 'Science', tagColor: 'bg-blue-500', category: 'science' }, { id: 8, title: 'Regional Cooperative Launches Seed Bank Program', source: 'Local Farmers Collective', date: '3 days ago', summary: 'New initiative preserves indigenous crop varieties and provides free seeds to member farmers. Program aims to boost biodiversity and food security.', fullContent: 'The Regional Farmers Cooperative has officially launched an ambitious seed bank program aimed at preserving indigenous crop varieties while providing free seeds to member farmers, marking a significant step toward enhanced agricultural biodiversity and food security.\n\nThe program, funded by a combination of government grants and cooperative member contributions, has already catalogued and stored over 150 traditional crop varieties that were at risk of being lost to commercial monoculture. These include heritage rice strains, traditional vegetables, and locally-adapted grain varieties developed over generations.\n\nMember farmers can request seeds free of charge, with the only requirement being to save and return seeds from a portion of their harvest to maintain the bank. This creates a sustainable cycle of preservation and sharing. Early participants report that traditional varieties often show better resilience to local pest and disease pressures, and some heritage crops command premium prices at farmers markets. The cooperative plans to establish 10 additional regional seed banks over the next three years, creating a network for preserving agricultural heritage and promoting crop diversity.', tag: 'Regional Initiative', tagColor: 'bg-orange-500', category: 'regional' }, { id: 9, title: 'Breakthrough in Crop Yield Prediction Using AI', source: 'Agricultural Technology Review', date: '3 days ago', summary: 'Machine learning models now predict harvest yields with 92% accuracy, helping farmers make better planning and financial decisions months in advance.', fullContent: 'Agricultural scientists have achieved a major breakthrough in crop yield prediction, developing AI models that forecast harvest outcomes with 92% accuracy up to three months before harvest time. This represents a quantum leap from traditional estimation methods which typically achieve only 70% accuracy.\n\nThe system analyzes satellite imagery, weather patterns, soil data, and historical yields to generate highly reliable predictions. Farmers using the technology report significantly better planning for storage, labor needs, and market timing. Financial institutions are also beginning to accept these predictions for crop loan assessments, improving farmer access to credit.\n\nThe AI system proved especially valuable this past season when it accurately predicted a 25% shortfall in regional wheat production two months early, allowing farmers to adjust contracts and minimize losses. The technology is currently being offered free to small farmers through a government partnership, with plans to expand coverage to all major crops by next year.', tag: 'Technology', tagColor: 'bg-teal-500', category: 'role' }, { id: 10, title: 'Community Composting Initiative Reduces Waste by 80%', source: 'Sustainable Agriculture Network', date: '4 days ago', summary: 'Village-level composting programs turn agricultural waste into valuable soil amendments, creating circular economy benefits for rural communities.', fullContent: 'A pioneering community composting initiative spanning 25 villages has demonstrated that coordinated waste management can reduce agricultural waste by 80% while producing high-quality organic fertilizer that improves soil health and crop yields.\n\nThe program collects crop residues, animal manure, and kitchen waste from participating households and farms, processing them in centralized composting facilities managed by trained community members. The resulting compost is distributed back to participants at minimal cost, creating a circular economy that benefits everyone involved.\n\nFarmers using the community compost report 15-20% yield improvements and significantly healthier soil structure after just one growing season. The program has also created employment for 150 people in compost management and distribution. Environmental benefits include reduced methane emissions from decomposing waste and decreased reliance on synthetic fertilizers. Based on this success, the government is funding expansion to 100 additional villages, with a goal of establishing community composting centers in 500 villages within three years.', tag: 'Regional Initiative', tagColor: 'bg-orange-500', category: 'regional' }, { id: 11, title: 'New Mobile App Connects Farmers Directly to Buyers', source: 'Digital Agriculture Today', date: '4 days ago', summary: 'Platform eliminates middlemen, increasing farmer profits by average of 35% while providing consumers with fresher produce at lower prices.', fullContent: 'A revolutionary mobile application launched last month is transforming agricultural supply chains by connecting farmers directly with buyers, eliminating traditional middlemen and creating win-win situations for producers and consumers alike.\n\nThe platform, which has already onboarded 10,000 farmers and 50,000 buyers, uses GPS matching to connect nearby farmers with restaurants, retailers, and individual consumers. Farmers report profit increases averaging 35% compared to selling through traditional channels, while buyers enjoy fresher produce at 20% lower prices.\n\nThe app includes features for quality verification through photo uploads, transparent pricing based on market rates, secure payment processing, and logistics support for delivery coordination. Small farmers particularly benefit from access to markets previously dominated by large suppliers. Success stories include a cooperative of 50 vegetable farmers who collectively negotiated a regular supply contract with a major supermarket chain, something that would have been impossible individually. The platform plans to add features for contract farming, crop insurance, and agricultural financing in upcoming updates.', tag: 'Technology', tagColor: 'bg-teal-500', category: 'role' }, { id: 12, title: 'Indigenous Farming Techniques Prove Superior in Climate Resilience', source: 'Journal of Traditional Agriculture', date: '5 days ago', summary: 'Research validates ancient agricultural practices, showing traditional methods often outperform modern techniques in extreme weather conditions.', fullContent: 'A comprehensive five-year study comparing traditional indigenous farming methods with modern industrial agriculture has revealed that ancient techniques often demonstrate superior resilience to climate extremes, challenging conventional assumptions about agricultural productivity.\n\nResearchers documented traditional practices including intercropping, natural pest management, water harvesting systems, and seed selection methods passed down through generations. In drought conditions, farms using traditional methods maintained 40% higher yields than those relying solely on modern inputs and monoculture approaches.\n\nParticularly impressive were indigenous water management techniques including contoured terracing and rainwater harvesting systems that enabled crop production even during severe dry periods. Traditional intercropping patterns also showed remarkable pest resistance without chemical inputs. The study emphasizes that combining the best of traditional knowledge with modern scientific understanding could create farming systems that are both productive and resilient. Agricultural universities are now incorporating indigenous techniques into their curricula, and extension services are developing programs to help farmers integrate these time-tested practices into their operations.', tag: 'Science', tagColor: 'bg-blue-500', category: 'science' }, { id: 13, title: 'Precision Drone Spraying Cuts Costs by 45%', source: 'AgriTech Weekly', date: '6 days ago', summary: 'New drone-based spraying systems deliver targeted pesticide and fertilizer applications, reducing costs and minimizing environmental impact.', fullContent: 'Field trials conducted across 120 farms have shown that precision drone spraying systems reduce input costs by an average of 45% compared to conventional tractor-based spraying. The drones use AI-driven image analysis to detect pest hotspots and nutrient deficiencies, applying treatment only where needed.\n\nFarmers reported not only substantial cost savings but also reduced crop damage and less soil compaction since drones avoid heavy machinery traffic. The technology also lowers chemical usage, improving environmental sustainability and reducing health risks for farm workers.\n\nThe initial investment of $3,000–$5,000 per drone is offset within two growing seasons, according to study results. Several agricultural cooperatives are negotiating group purchasing agreements to make drones more affordable for smallholder farmers. Governments are also considering subsidy programs to encourage wider adoption.', tag: 'Technology', tagColor: 'bg-teal-500', category: 'role' }, { id: 14, title: 'Beekeeping Revival Boosts Crop Pollination Rates', source: 'Sustainable Farming Journal', date: '1 week ago', summary: 'Community-led beekeeping programs increase pollination efficiency, raising yields in fruit and vegetable crops by up to 25%.', fullContent: 'A revival of traditional beekeeping practices supported by agricultural NGOs has led to significant improvements in crop pollination across multiple regions. Over 2,000 smallholder farmers have been trained to establish and maintain hives, resulting in higher fruit set and yields in pollinator-dependent crops such as cucumbers, apples, and melons.\n\nData from pilot regions indicates a 20–25% increase in yields after beekeeping adoption, with farmers also gaining an additional income stream through honey sales. Communities have reported stronger ecosystem resilience, as pollinator populations recover from previous declines linked to pesticide overuse.\n\nExperts emphasize the dual benefit of pollination services and biodiversity restoration. Governments in several countries are now drafting incentive policies to support farmer-led beekeeping programs, including low-interest loans for hive equipment and training workshops.', tag: 'Science', tagColor: 'bg-blue-500', category: 'science' }, { id: 15, title: 'New Policy Mandates Climate-Smart Farming Practices', source: 'Ministry of Environment and Agriculture', date: '1 week ago', summary: 'Farmers applying for subsidies must now adopt at least two climate-smart practices such as crop rotation, water harvesting, or renewable energy use.', fullContent: 'In a landmark policy reform, the Ministry of Environment and Agriculture has announced that all new applications for agricultural subsidies will require farmers to demonstrate the use of at least two climate-smart practices. Eligible practices include crop rotation, rainwater harvesting, conservation tillage, renewable energy for irrigation, and organic composting.\n\nThe policy aims to align farming practices with national climate resilience targets, addressing both adaptation and mitigation. Officials estimate that within five years, over 70% of subsidized farms will have transitioned to sustainable practices.\n\nWhile some farmer unions have expressed concern over additional compliance requirements, the ministry has pledged to provide free technical assistance and training programs. International development partners have welcomed the move, offering financial support for initial implementation.', tag: 'Regional Policy', tagColor: 'bg-orange-500', category: 'regional' }, { id: 16, title: 'Satellite Data Maps Hidden Groundwater Reserves', source: 'Earth Science Monitor', date: '2 weeks ago', summary: 'Advanced satellite imaging identifies untapped aquifers, offering new hope for drought-prone farming regions.', fullContent: 'Scientists using next-generation satellite imaging systems have successfully mapped hidden groundwater reserves across three drought-prone agricultural belts. The research, led by the Global Water Institute, identified aquifers holding an estimated 200 billion cubic meters of freshwater previously unknown to local authorities.\n\nPilot projects have already begun drilling controlled access wells, with early results showing strong potential for supporting sustainable irrigation during dry seasons. Authorities stress that the reserves must be carefully managed to avoid over-extraction and ecological damage.\n\nFarmers in affected regions have welcomed the findings as a lifeline for crop survival. Plans are underway to integrate the satellite mapping system into national agricultural planning frameworks, ensuring efficient water allocation and long-term resilience.', tag: 'Geology', tagColor: 'bg-amber-600', category: 'role' }, { id: 17, title: 'Urban Rooftop Farming Expands in Major Cities', source: 'Urban Agriculture Review', date: '2 weeks ago', summary: 'Rooftop farms now supply up to 10% of fresh vegetables in metropolitan markets, reducing transport costs and emissions.', fullContent: 'Urban rooftop farming initiatives have seen rapid expansion in major metropolitan centers, with over 500 new rooftop farms established in the past year. These farms now account for nearly 10% of fresh vegetable supply in certain city markets, reducing dependency on long-distance transport and cutting carbon emissions.\n\nThe farms employ hydroponic and aquaponic systems optimized for small urban spaces, producing leafy greens, herbs, and tomatoes year-round. Consumers benefit from fresher produce at competitive prices, while building owners earn additional income through farm rentals.\n\nMunicipal governments are introducing tax incentives and zoning allowances to encourage rooftop farming, with particular focus on repurposing underutilized spaces in industrial and residential buildings. Experts predict that within a decade, urban agriculture could account for up to 25% of fresh produce in some cities.', tag: 'Regional Initiative', tagColor: 'bg-orange-500', category: 'regional' }];

  const itemsPerPage = 9;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = newsItems.slice(startIndex, startIndex + itemsPerPage);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedNews((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedNews((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Weather Sidebar */}
        <aside className="sticky top-0 w-64 h-[70vh] bg-white rounded-2xl shadow-lg p-6 border border-orange-200 overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Weather Forecast</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-4 rounded-full">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Current</p>
                <p className="text-2xl font-bold text-gray-800">28°C</p>
                <p className="text-gray-500 text-sm">Sunny & Clear</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-2">Next 4 Days</p>
              <div className="flex justify-between">
                {weatherForecast.map((day, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-xs text-gray-400 mb-1">{day.day}</p>
                    <day.icon className="w-6 h-6 mx-auto text-orange-500 mb-1" />
                    <p className="text-sm font-semibold text-gray-700">{day.temp}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-orange-50 rounded-lg p-3 flex flex-col items-center">
                <Sunrise className="w-5 h-5 text-orange-600 mb-1" />
                <p className="text-xs text-gray-600">Sunrise</p>
                <p className="text-sm font-semibold text-gray-800">6:24 AM</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 flex flex-col items-center">
                <Sunset className="w-5 h-5 text-orange-600 mb-1" />
                <p className="text-xs text-gray-600">Sunset</p>
                <p className="text-sm font-semibold text-gray-800">6:47 PM</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 flex flex-col items-center">
                <Droplets className="w-5 h-5 text-green-600 mb-1" />
                <p className="text-xs text-gray-600">Humidity</p>
                <p className="text-sm font-semibold text-gray-800">68%</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3 flex flex-col items-center">
                <Bug className="w-5 h-5 text-red-600 mb-1" />
                <p className="text-xs text-gray-600">Pest Alert</p>
                <p className="text-sm font-semibold text-gray-800">Low</p>
              </div>
            </div>
          </div>
        </aside>

        {/* News Grid */}
        <main className="flex-1">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center lg:text-left">
            Latest News
          </h2>
          <div className="columns-1 sm:columns-2 xl:columns-3 gap-6 space-y-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedNews(item)}
                className="break-inside-avoid bg-white rounded-2xl shadow-lg p-6 border border-orange-100 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col"
              >
                <span
                  className={`${item.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block`}
                >
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs mb-2">{item.source}</p>
                <p className="text-gray-700 text-sm line-clamp-3">{item.summary}</p>
                <div className="flex mt-auto items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    className={`flex items-center gap-1 text-sm ${likedNews.has(item.id) ? 'text-pink-500' : 'text-gray-500'
                      }`}
                  >
                    <Heart className={`w-4 h-4 ${likedNews.has(item.id) ? 'fill-pink-500' : ''}`} />
                    {likedNews.has(item.id) ? 'Liked' : 'Like'}
                  </button>
                  <button
                    onClick={(e) => toggleBookmark(item.id, e)}
                    className={`flex items-center gap-1 text-sm ${bookmarkedNews.has(item.id) ? 'text-orange-500' : 'text-gray-500'
                      }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${bookmarkedNews.has(item.id) ? 'fill-orange-500' : ''}`}
                    />
                    {bookmarkedNews.has(item.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium ${currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
            >
              <ChevronLeft className="w-5 h-5 inline-block mr-1" />
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-10 h-10 rounded-lg font-medium ${currentPage === idx + 1
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-orange-200 text-gray-600 hover:bg-orange-100'
                  }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium ${currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
            >
              Next
              <ChevronRight className="w-5 h-5 inline-block ml-1" />
            </button>
          </div>
        </main>
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-orange-400 to-amber-500 text-white p-6 rounded-t-2xl flex justify-between items-start">
              <div className="pr-4">
                <span
                  className={`${selectedNews.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2`}
                >
                  {selectedNews.tag}
                </span>
                <h2 className="text-2xl font-bold mb-1">{selectedNews.title}</h2>
                <div className="flex items-center gap-2 text-sm text-orange-50">
                  <span>{selectedNews.source}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {selectedNews.date}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="prose max-w-none text-gray-700">
                {selectedNews.fullContent.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="mb-4">
                    {p}
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={(e) => toggleLike(selectedNews.id, e)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${likedNews.has(selectedNews.id)
                    ? 'text-pink-500 bg-pink-50'
                    : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 ${likedNews.has(selectedNews.id) ? 'fill-pink-500' : ''}`}
                  />
                  {likedNews.has(selectedNews.id) ? 'Liked' : 'Like'}
                </button>
                <button
                  onClick={(e) => toggleBookmark(selectedNews.id, e)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${bookmarkedNews.has(selectedNews.id)
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${bookmarkedNews.has(selectedNews.id) ? 'fill-orange-500' : ''
                      }`}
                  />
                  {bookmarkedNews.has(selectedNews.id) ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
