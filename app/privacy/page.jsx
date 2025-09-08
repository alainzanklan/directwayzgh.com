import React from 'react';
import { Shield, Mail, Globe, FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Last updated: September 07, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-8">
              We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
            </p>

            {/* Interpretation and Definitions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interpretation and Definitions</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Interpretation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Definitions</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                For the purposes of this Privacy Policy:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ul className="space-y-3">
                  <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                  <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                  <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to DirectWayz GH, Accra.</li>
                  <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
                  <li><strong>Country</strong> refers to: Ghana</li>
                  <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                  <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                  <li><strong>Service</strong> refers to the Website.</li>
                  <li><strong>Website</strong> refers to DirectWayz GH, accessible from <a href="https://directwayzgh.com" className="text-blue-600 hover:text-blue-700">directwayzgh.com</a></li>
                  <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>
              </div>
            </section>

            {/* Collecting and Using Personal Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Collecting and Using Your Personal Data</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Types of Data Collected</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Personal Data</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Usage Data</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Usage Data</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Information from Third-Party Social Media Services</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Google</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Facebook</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Instagram</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Twitter</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">LinkedIn</span>
                </div>
              </div>
            </section>

            {/* Use of Personal Data */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Use of Your Personal Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Company may use Personal Data for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.</li>
                <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased.</li>
                <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
                <li><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer.</li>
                <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sharing Your Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share Your personal information in the following situations:
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service.</li>
                  <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with any merger, sale of Company assets, financing, or acquisition.</li>
                  <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users.</li>
                  <li><strong>With Your consent:</strong> We may disclose Your personal information for any other purpose with Your consent.</li>
                </ul>
              </div>
            </section>

            {/* Security */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Security of Your Personal Data</h3>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <p className="text-gray-700 leading-relaxed">
                  The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to this Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
              </p>
            </section>

            {/* Contact Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, You can contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a href="mailto:support@directwayzgh.com" className="text-blue-600 hover:text-blue-700">
                      support@directwayzgh.com
                    </a>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Website</p>
                    <a href="https://directwayzgh.com/contact" className="text-blue-600 hover:text-blue-700">
                      directwayzgh.com/contact
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;