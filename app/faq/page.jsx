'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Users, Shield, Phone } from 'lucide-react';

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = {
    general: {
      title: "Général",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "blue",
      faqs: [
        {
          title: 'Qu\'est-ce que votre plateforme ?',
          desc: "Notre plateforme connecte les particuliers recherchant des services professionnels avec des experts qualifiés. Elle facilite la recherche du bon professionnel selon vos besoins spécifiques et permet une tarification compétitive."
        },
        {
          title: 'Comment fonctionne la plateforme ?',
          desc: 'Parcourez notre base de données de professionnels qualifiés, consultez leurs profils, et sélectionnez ceux qui correspondent à vos besoins. Publiez une annonce de projet et les professionnels intéressés pourront postuler.'
        },
        {
          title: 'Y a-t-il des frais pour utiliser la plateforme ?',
          desc: 'L\'inscription et la navigation sont gratuites. Des frais de service nominaux peuvent s\'appliquer lors d\'une embauche pour soutenir la maintenance et l\'amélioration de la plateforme.'
        }
      ]
    },
    professionals: {
      title: "Pour les Professionnels",
      icon: <Users className="w-5 h-5" />,
      color: "green",
      faqs: [
        {
          title: 'Comment devenir professionnel sur votre plateforme ?',
          desc: "Créez un profil détaillant vos compétences, expérience et qualifications. Notre équipe examine votre candidature pour s'assurer qu'elle répond à nos standards de qualité."
        },
        {
          title: 'Comment les professionnels fixent-ils leurs tarifs ?',
          desc: "Les professionnels définissent leurs propres tarifs selon le type de service, la complexité et le temps requis. Cette flexibilité permet une tarification adaptée à chaque situation."
        },
        {
          title: 'Les utilisateurs peuvent-ils négocier les prix ?',
          desc: 'Oui, la négociation est possible selon les préférences des deux parties. Nous encourageons une communication ouverte pour un accord mutuellement satisfaisant.'
        }
      ]
    },
    security: {
      title: "Sécurité & Qualité",
      icon: <Shield className="w-5 h-5" />,
      color: "purple",
      faqs: [
        {
          title: 'Comment assurez-vous la qualité des professionnels ?',
          desc: 'Nous avons un processus de vérification rigoureux incluant la validation des qualifications, références et historique professionnel pour garantir l\'excellence.'
        },
        {
          title: 'Les utilisateurs peuvent-ils laisser des avis ?',
          desc: 'Oui, les utilisateurs peuvent laisser des avis et notes sur les professionnels. Cela maintient la transparence et aide les autres à prendre des décisions éclairées.'
        },
        {
          title: 'Quelles mesures pour la sécurité des données ?',
          desc: 'Nous utilisons un cryptage avancé pour protéger les données utilisateur et avons des directives strictes contre les activités frauduleuses. Les identités sont vérifiées.'
        }
      ]
    }
  };

  const supportFaq = {
    title: 'Comment contacter le support client ?',
    desc: 'Pour toute question ou assistance, contactez notre équipe via la section Contact de notre site, par email ou téléphone. Nous sommes là pour vous aider !'
  };

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: "text-blue-600"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200", 
      text: "text-green-700",
      icon: "text-green-600"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700", 
      icon: "text-purple-600"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur notre plateforme et nos services.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {Object.entries(faqCategories).map(([key, category]) => (
            <div key={key} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`${colorClasses[category.color].bg} ${colorClasses[category.color].border} border-b px-6 py-4`}>
                <div className="flex items-center gap-3">
                  <div className={colorClasses[category.color].icon}>
                    {category.icon}
                  </div>
                  <h2 className={`text-xl font-semibold ${colorClasses[category.color].text}`}>
                    {category.title}
                  </h2>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = `${key}-${faqIndex}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div key={faqIndex} className="group">
                      <button
                        onClick={() => toggle(globalIndex)}
                        className="w-full px-6 py-5 text-left hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:bg-slate-50"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-slate-800 pr-4 group-hover:text-blue-600 transition-colors">
                            {faq.title}
                          </h3>
                          <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                          </div>
                        </div>
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-6 pb-5">
                          <p className="text-slate-600 leading-relaxed">
                            {faq.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Support Contact Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg text-white overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {supportFaq.title}
                  </h3>
                  <p className="text-blue-100 leading-relaxed mb-4">
                    {supportFaq.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="/contact" 
                      className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      Page Contact
                    </a>
                    <a 
                      href="mailto:info@directwayzgh.com" 
                      className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      Email Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-6">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;