import { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Award, User, Send, Bot, ChevronDown, ChevronUp, X, Plus } from 'lucide-react';

// Define types for our data structures
interface Response {
    id: number;
    author: string;
    isExpert: boolean;
    expertise?: string;
    votes: number;
    text: string;
}

interface Question {
    id: number;
    title: string;
    context: string;
    asker: string;
    isExpert: boolean;
    category: string;
    tags: string[];
    responses: Response[];
}

interface ChatMessage {
    id: number;
    type: 'user' | 'bot';
    text: string;
}

interface NewQuestion {
    title: string;
    context: string;
    category: string;
    tags: string[];
}

const AskStation = () => {
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
    const [selectedFarm, setSelectedFarm] = useState('general');
    const [showChatbot, setShowChatbot] = useState(false);
    const [showAskForm, setShowAskForm] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        { id: 1, type: 'bot', text: 'Hello! Ask me anything about your farm, crops, or agricultural practices. How can I help you today?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [votedResponses, setVotedResponses] = useState<Record<string, 'up' | 'down' | null>>({});

    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            title: 'Best organic pest control for tomatoes?',
            context: 'I have been dealing with aphids on my tomato plants and want to avoid chemical pesticides.',
            asker: '@organicfarmer23',
            isExpert: false,
            category: 'Pest Control',
            tags: ['all'],
            responses: [
                {
                    id: 1,
                    author: '@pestexpert',
                    isExpert: true,
                    expertise: 'Entomologist',
                    votes: 45,
                    text: 'Companion planting with marigolds is highly effective against aphids. Additionally, introducing ladybugs and lacewings provides natural predation. Neem oil spray can be used as a last resort - mix 2 tablespoons per gallon of water and spray in early morning or evening.'
                },
                {
                    id: 2,
                    author: '@greenhands',
                    isExpert: false,
                    votes: 23,
                    text: 'I have had great success with a simple soap spray. Mix 1 tablespoon of dish soap with a quart of water. Spray directly on aphids. Works like a charm!'
                },
                {
                    id: 3,
                    author: '@permaculturepro',
                    isExpert: true,
                    expertise: 'Agronomist',
                    votes: 38,
                    text: 'Focus on prevention: healthy soil equals healthy plants that resist pests naturally. Add compost regularly and ensure proper spacing for air circulation. When aphids appear, a strong water spray can knock them off effectively.'
                }
            ]
        },
        {
            id: 2,
            title: 'When is the best time to plant wheat?',
            context: 'First-time wheat farmer in the northern region. Confused about spring vs winter wheat timing.',
            asker: '@newfarmer2024',
            isExpert: false,
            category: 'Crop Planning',
            tags: ['all'],
            responses: [
                {
                    id: 1,
                    author: '@wheatspecialist',
                    isExpert: true,
                    expertise: 'Crop Scientist',
                    votes: 67,
                    text: 'It depends on your variety and climate. Winter wheat should be planted in fall (September-November) so it establishes before winter dormancy and resumes growth in spring. Spring wheat is planted as soon as soil can be worked (March-May). Winter wheat typically yields more but requires cold vernalization.'
                },
                {
                    id: 2,
                    author: '@farmerjohn',
                    isExpert: false,
                    votes: 12,
                    text: 'I always plant my wheat in October. Never had issues.'
                }
            ]
        },
        {
            id: 3,
            title: 'Soil pH too acidic - quick fixes?',
            context: 'My soil test came back at pH 5.2. Growing vegetables that need neutral pH. What are my options?',
            asker: '@veggiegarden',
            isExpert: false,
            category: 'Soil Health',
            tags: ['Geologist', 'Agronomist'],
            responses: [
                {
                    id: 1,
                    author: '@soilscientist',
                    isExpert: true,
                    expertise: 'Soil Scientist',
                    votes: 89,
                    text: 'Agricultural lime (calcium carbonate) is the standard solution. For pH 5.2, you will need approximately 50-70 pounds per 1000 sq ft depending on soil type. Apply in fall if possible, as it takes 3-6 months to fully react. Wood ash can provide a quicker but less controlled pH increase. Test again in 6 months.'
                },
                {
                    id: 2,
                    author: '@geologistfarmer',
                    isExpert: true,
                    expertise: 'Geologist',
                    votes: 56,
                    text: 'Before adding lime, identify why your soil is acidic. Heavy rainfall, decomposing organic matter, and certain fertilizers all contribute. Address the root cause while treating symptoms. Consider dolomitic lime if you also need magnesium.'
                }
            ]
        },
        {
            id: 4,
            title: 'Irrigation system recommendations for 5 hectares?',
            context: 'Looking to upgrade from flood irrigation. Budget around $10,000. Growing mixed vegetables.',
            asker: '@farmexpand',
            isExpert: false,
            category: 'Equipment',
            tags: ['Technician'],
            responses: [
                {
                    id: 1,
                    author: '@irrigationtech',
                    isExpert: true,
                    expertise: 'Agricultural Engineer',
                    votes: 72,
                    text: 'For mixed vegetables at that scale, drip irrigation with fertigation capability offers best ROI. Budget $1,500-2,000 per hectare for quality system. Look for pressure-compensating emitters and filtration. You will save 40-60% on water and see yield improvements. Check for government subsidies - many regions offer 50% cost coverage.'
                },
                {
                    id: 2,
                    author: '@smallfarmer',
                    isExpert: false,
                    votes: 19,
                    text: 'We installed drip irrigation last year. Game changer! Water bill cut in half and plants are healthier.'
                }
            ]
        },
        {
            id: 5,
            title: 'Chickens not laying - what could be wrong?',
            context: 'My 8-month-old hens suddenly stopped laying 2 weeks ago. They seem healthy otherwise.',
            asker: '@backyardpoultry',
            isExpert: false,
            category: 'Livestock',
            tags: ['Veterinarian'],
            responses: [
                {
                    id: 1,
                    author: '@poultryvet',
                    isExpert: true,
                    expertise: 'Veterinarian',
                    votes: 94,
                    text: 'Several possible causes: 1) Stress from predators or changes in routine, 2) Insufficient light (need 14-16 hours daily), 3) Poor nutrition (ensure 16-18% protein layer feed), 4) Molting season, 5) Parasites or disease. Check for mites/lice, ensure clean water, and verify nesting boxes are private and comfortable. If no improvement in 2 weeks, consult a vet.'
                },
                {
                    id: 2,
                    author: '@chickenkeeper',
                    isExpert: false,
                    votes: 28,
                    text: 'Mine stopped laying when a fox was hanging around. After securing the coop better they resumed within a week.'
                },
                {
                    id: 3,
                    author: '@farmvet',
                    isExpert: true,
                    expertise: 'Veterinarian',
                    votes: 61,
                    text: 'Also consider age and breed. Some breeds naturally pause laying in winter or after peak production year. If they are heritage breeds, they may lay seasonally. Monitor for any signs of illness: lethargy, loss of appetite, abnormal droppings.'
                }
            ]
        },
        {
            id: 6,
            title: 'Cover crops for nitrogen fixation?',
            context: 'Want to reduce synthetic fertilizer use. Which cover crops work best between growing seasons?',
            asker: '@sustainablefarm',
            isExpert: false,
            category: 'Soil Health',
            tags: ['Agronomist'],
            responses: [
                {
                    id: 1,
                    author: '@agronomist',
                    isExpert: true,
                    expertise: 'Agronomist',
                    votes: 78,
                    text: 'Legumes are your best nitrogen fixers. Crimson clover, hairy vetch, and field peas are excellent cool-season options. Plant in fall, they fix nitrogen over winter, then till in spring 2-3 weeks before planting. Can add 80-150 lbs nitrogen per acre. Austrian winter peas are particularly cold-hardy.'
                },
                {
                    id: 2,
                    author: '@regenerativefarmer',
                    isExpert: false,
                    votes: 42,
                    text: 'I use a mix: hairy vetch, crimson clover, and cereal rye. The rye provides biomass while legumes fix nitrogen. Works great!'
                }
            ]
        }
    ]);

    const [newQuestion, setNewQuestion] = useState<NewQuestion>({
        title: '',
        context: '',
        category: '',
        tags: ['all']
    });

    const availableTags = ['all', 'Veterinarian', 'Agronomist', 'Geologist', 'Technician', 'Entomologist'];
    const farms = ['general', 'Sunset Valley Farm', 'Green Acres', 'River Bend Farm'];

    const handleVote = (questionId: number, responseId: number, voteType: 'up' | 'down') => {
        const key = `${questionId}-${responseId}`;
        const currentVote = votedResponses[key];

        setVotedResponses({
            ...votedResponses,
            [key]: currentVote === voteType ? null : voteType
        });
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const newMessage: ChatMessage = {
            id: chatMessages.length + 1,
            type: 'user',
            text: inputMessage
        };

        const botResponses = [
            'That is a great question! Based on your farm conditions, I recommend checking soil moisture levels first.',
            'For optimal results in your region, consider the seasonal patterns and weather forecasts.',
            'I can help you with that. Could you provide more details about your specific situation?',
            'Based on best practices, here are some recommendations for your query.',
            'This is a common concern among farmers. Let me suggest a few proven solutions.'
        ];

        const botResponse: ChatMessage = {
            id: chatMessages.length + 2,
            type: 'bot',
            text: botResponses[Math.floor(Math.random() * botResponses.length)]
        };

        setChatMessages([...chatMessages, newMessage, botResponse]);
        setInputMessage('');
    };

    const getSortedResponses = (responses: Response[]) => {
        return [...responses].sort((a, b) => {
            if (a.isExpert && !b.isExpert) return -1;
            if (!a.isExpert && b.isExpert) return 1;
            return b.votes - a.votes;
        });
    };

    const handleTagToggle = (tag: string) => {
        if (tag === 'all') {
            setNewQuestion({ ...newQuestion, tags: ['all'] });
        } else {
            let newTags = newQuestion.tags.filter(t => t !== 'all');
            if (newTags.includes(tag)) {
                newTags = newTags.filter(t => t !== tag);
            } else {
                newTags.push(tag);
            }
            setNewQuestion({
                ...newQuestion,
                tags: newTags.length === 0 ? ['all'] : newTags
            });
        }
    };

    const handleAskQuestion = () => {
        if (!newQuestion.title || !newQuestion.context || !newQuestion.category) {
            alert('Please fill in all required fields');
            return;
        }

        const question: Question = {
            id: Date.now(),
            title: newQuestion.title,
            context: newQuestion.context,
            asker: '@currentuser',
            isExpert: false,
            category: newQuestion.category,
            tags: newQuestion.tags,
            responses: []
        };

        setQuestions([question, ...questions]);
        setShowAskForm(false);
        setNewQuestion({
            title: '',
            context: '',
            category: '',
            tags: ['all']
        });
    };

    const handlePostResponse = (questionId: number) => {
        const textarea = document.getElementById(`response-${questionId}`) as HTMLTextAreaElement;
        const text = textarea.value.trim();
        if (!text) {
            alert('Please write a response');
            return;
        }

        const newResponse: Response = {
            id: Date.now(),
            author: '@currentuser',
            isExpert: false,
            votes: 0,
            text: text
        };

        setQuestions(questions.map(q =>
            q.id === questionId
                ? { ...q, responses: [...q.responses, newResponse] }
                : q
        ));

        textarea.value = '';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Ask Station</h1>
                        <p className="text-gray-600">Get answers from the community or chat with our AI assistant</p>
                    </div>
                    <button
                        onClick={() => setShowAskForm(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Ask Question</span>
                    </button>
                </div>

                {/* Q&A Feed Section */}
                <div className="mb-12">
                    <div className="flex items-center space-x-3 mb-6">
                        <MessageCircle className="w-8 h-8 text-orange-600" />
                        <h2 className="text-3xl font-bold text-gray-800">Community Q&A</h2>
                    </div>

                    <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
                        {questions.map((question) => (
                            <div
                                key={question.id}
                                className="break-inside-avoid bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-200 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                                                {question.category}
                                            </span>
                                            {!question.tags.includes('all') && (
                                                <div className="flex items-center gap-1">
                                                    {question.tags.map(tag => (
                                                        <span key={tag} className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{question.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{question.context}</p>
                                        <div className="flex items-center space-x-2">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-orange-600 font-medium">{question.asker}</span>
                                            {question.isExpert && (
                                                <span className="flex items-center text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                                    <Award className="w-3 h-3 mr-1" />
                                                    Expert
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        setExpandedQuestion(prev =>
                                            prev === question.id ? null : question.id
                                        )
                                    }
                                    className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center space-x-2"
                                >
                                    <span>{expandedQuestion === question.id ? 'Hide' : 'View'} Responses ({question.responses.length})</span>
                                    {expandedQuestion === question.id ? (
                                        <ChevronUp className="w-4 h-4" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                </button>

                                {expandedQuestion === question.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                                        {/* Response Input */}
                                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                            <textarea
                                                placeholder="Write your answer..."
                                                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-300 focus:outline-none text-sm mb-2"
                                                rows={3}
                                                id={`response-${question.id}`}
                                            />
                                            <button
                                                onClick={() => handlePostResponse(question.id)}
                                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
                                            >
                                                Post Response
                                            </button>
                                        </div>

                                        {question.responses.length === 0 ? (
                                            <p className="text-sm text-gray-500 text-center py-4">No responses yet. Be the first to answer!</p>
                                        ) : (
                                            getSortedResponses(question.responses).map((response) => {
                                                const voteKey = `${question.id}-${response.id}`;
                                                const currentVote = votedResponses[voteKey];
                                                const displayVotes = response.votes + (currentVote === 'up' ? 1 : currentVote === 'down' ? -1 : 0);

                                                return (
                                                    <div
                                                        key={response.id}
                                                        className={`rounded-lg p-4 ${response.isExpert ? 'bg-orange-50 border-2 border-orange-200' : 'bg-gray-50'
                                                            }`}
                                                    >
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex items-center space-x-2 flex-1">
                                                                <span className="text-sm font-medium text-orange-600">{response.author}</span>
                                                                {response.isExpert && (
                                                                    <span className="flex items-center text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full font-medium">
                                                                        <Award className="w-3 h-3 mr-1" />
                                                                        {response.expertise}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    onClick={() => handleVote(question.id, response.id, 'up')}
                                                                    className={`p-1 rounded transition-colors ${currentVote === 'up'
                                                                        ? 'text-green-600 bg-green-100'
                                                                        : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                                                        }`}
                                                                >
                                                                    <ThumbsUp className="w-4 h-4" />
                                                                </button>
                                                                <span className="text-sm font-bold text-gray-700 min-w-[2rem] text-center">
                                                                    {displayVotes}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleVote(question.id, response.id, 'down')}
                                                                    className={`p-1 rounded transition-colors ${currentVote === 'down'
                                                                        ? 'text-red-600 bg-red-100'
                                                                        : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                                                                        }`}
                                                                >
                                                                    <ThumbsDown className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-700 leading-relaxed">{response.text}</p>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating AI Button */}
            <button
                onClick={() => setShowChatbot(!showChatbot)}
                className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-orange-400 to-yellow-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 ${showChatbot ? 'rotate-45' : 'rotate-0'
                    }`}
                style={{ width: '64px', height: '64px' }}
            >
                {showChatbot ? (
                    <X className="w-8 h-8" />
                ) : (
                    <Bot className="w-8 h-8" />
                )}
            </button>

            {/* Chatbot Modal */}
            {showChatbot && (
                <div className="fixed bottom-24 right-8 w-96 bg-white rounded-2xl shadow-2xl border-2 border-yellow-200 overflow-hidden z-40">
                    {/* Farm Selection */}
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <Bot className="w-6 h-6 text-white" />
                                <h3 className="text-lg font-bold text-white">AI Assistant</h3>
                            </div>
                        </div>
                        <select
                            value={selectedFarm}
                            onChange={(e) => setSelectedFarm(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border-2 border-white/30 bg-white/90 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-white text-sm"
                        >
                            {farms.map((farm) => (
                                <option key={farm} value={farm}>
                                    {farm === 'general' ? 'General Farming' : farm}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Chat Area */}
                    <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {chatMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${message.type === 'user'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white border-2 border-yellow-200 text-gray-800'
                                        }`}
                                >
                                    {message.type === 'bot' && (
                                        <div className="flex items-center space-x-2 mb-1">
                                            <Bot className="w-4 h-4 text-yellow-600" />
                                            <span className="text-xs font-semibold text-yellow-600">AI Assistant</span>
                                        </div>
                                    )}
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t-2 border-gray-200 bg-white">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type your question..."
                                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-300 focus:outline-none text-sm"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Ask Question Modal */}
            {showAskForm && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowAskForm(false)}
                >
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white p-6 rounded-t-2xl flex justify-between items-center">
                            <h3 className="text-2xl font-bold">Ask a Question</h3>
                            <button
                                onClick={() => setShowAskForm(false)}
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Question Title *</label>
                                <input
                                    type="text"
                                    value={newQuestion.title}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-300 focus:outline-none"
                                    placeholder="What do you want to know?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                <input
                                    type="text"
                                    value={newQuestion.category}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-300 focus:outline-none"
                                    placeholder="e.g., Pest Control, Soil Health"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Context / Details *</label>
                                <textarea
                                    value={newQuestion.context}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, context: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-300 focus:outline-none"
                                    placeholder="Provide more details about your question..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Who can answer? (Select expert roles or leave as "all")
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableTags.map(tag => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => handleTagToggle(tag)}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${newQuestion.tags.includes(tag)
                                                ? 'bg-orange-500 text-white border-2 border-orange-500'
                                                : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-gray-200'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {newQuestion.tags.includes('all')
                                        ? 'Anyone can answer this question'
                                        : `Only users with ${newQuestion.tags.join(' or ')} role(s) can answer`}
                                </p>
                            </div>

                            <button
                                onClick={handleAskQuestion}
                                className="w-full py-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white rounded-lg hover:shadow-lg transition-all font-medium text-lg"
                            >
                                Post Question
                            </button>
                        </div>
                    </div>
                </div>
            )} 
        </div>
    );
};

export default AskStation;