import React from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiLock,FiScan,FiCpu,FiZap,FiShield,FiCheck}=FiIcons;

function SecurityLevelSelector({selectedLevel,onLevelChange}) {
const securityLevels=[ 
{id: 'standard',name: 'Standard Security',description: 'Email & Password with 2FA',detailedDesc: 'Secure login with email verification and two-factor authentication',icon: FiLock,color: 'from-blue-500 to-cyan-500',security: 'Standard',features: ['Email & Password','2FA Authentication','Session Management','Basic Encryption']},{id: 'biometric',name: 'Biometric Quantum',description: 'Fingerprint + Face Recognition + Quantum Encryption',detailedDesc: 'Multi-modal biometric authentication with quantum-grade security',icon: FiScan,color: 'from-purple-500 to-pink-500',security: 'Advanced',badge: 'REVOLUTIONARY',features: ['Fingerprint Scan','Face Recognition','Voice Pattern','Quantum Encryption']},{id: 'neural',name: 'Neural Pattern Auth',description: 'Brainwave Pattern Recognition + AI Learning',detailedDesc: 'Revolutionary neural pattern authentication with adaptive AI learning',icon: FiCpu,color: 'from-orange-500 to-red-500',security: 'Maximum',badge: 'WORLD FIRST',features: ['Brainwave Patterns','AI Learning','Neural Networks','Adaptive Security']},{id: 'quantum',name: 'Quantum Entanglement',description: 'Quantum Key Distribution + Zero-Knowledge Proof',detailedDesc: 'Mathematically unbreakable quantum entanglement security protocol',icon: FiZap,color: 'from-green-500 to-teal-500',security: 'Quantum',badge: 'IMPOSSIBLE TO HACK',features: ['Quantum Entanglement','Zero-Knowledge Proof','Quantum Keys','Unbreakable Security']} ];

const selectedLevelData=securityLevels.find(level=> level.id===selectedLevel) || securityLevels[0];

return ( 
<div className="space-y-6"> 
{/* Security Levels */} 
<div className="space-y-4"> 
{securityLevels.map((level,index)=> {
const isActive=selectedLevel===level.id;
return ( 
<motion.div 
key={level.id} 
className={`relative p-4 lg:p-6 rounded-xl border cursor-pointer transition-all ${isActive ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' : 'border-gray-600/30 hover:border-gray-500/50'}`} 
style={{
background: isActive ? 'linear-gradient(145deg,rgba(59,130,246,0.1) 0%,rgba(99,102,241,0.05) 100%)' : 'linear-gradient(145deg,rgba(31,41,55,0.6) 0%,rgba(17,24,39,0.8) 100%)',
boxShadow: isActive ? '0 8px 32px rgba(59,130,246,0.2),inset 0 1px 0 rgba(156,163,175,0.1)' : '0 4px 16px rgba(0,0,0,0.3),inset 0 1px 0 rgba(156,163,175,0.05)'
}} 
onClick={()=> onLevelChange(level.id)} 
initial={{opacity: 0,y: 20}} 
animate={{opacity: 1,y: 0}} 
transition={{delay: index * 0.1,duration: 0.5}} 
whileHover={{scale: 1.02,y: -2}} 
whileTap={{scale: 0.98}}
>
{/* Badge - Centered positioning */} 
{level.badge && ( 
<div className="absolute -top-3 left-1/2 transform -translate-x-1/2"> 
<motion.span 
className="text-xs font-bold px-3 py-1 rounded-full text-white whitespace-nowrap" 
style={{
background: 'linear-gradient(145deg,rgba(249,115,22,0.9) 0%,rgba(239,68,68,0.8) 100%)',
border: '1px solid rgba(249,115,22,0.4)',
boxShadow: '0 4px 12px rgba(249,115,22,0.3)'
}} 
animate={{scale: [1,1.05,1]}} 
transition={{duration: 2,repeat: Infinity}}
> 
{level.badge} 
</motion.span> 
</div> 
)}

<div className="flex items-center">
{/* Selection Indicator - Center-left position */}
<div className="flex items-center mr-4 sm:mr-6">
<div 
className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all flex items-center justify-center ${
isActive ? 'border-blue-400 bg-blue-500' : 'border-gray-500'
}`}
>
{isActive && (
<motion.div
initial={{scale: 0}}
animate={{scale: 1}}
transition={{type: "spring",stiffness: 500,damping: 30}}
>
<SafeIcon icon={FiCheck} className="text-white text-xs sm:text-sm" />
</motion.div>
)}
</div>
</div>

{/* Content */} 
<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between flex-1"> 
{/* Main Content */} 
<div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 flex-1"> 
{/* Icon */} 
<motion.div 
className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0`} 
style={{
background: `linear-gradient(145deg,${level.color.split(' ')[1]} 0%,${level.color.split(' ')[3]} 100%)`,
border: '1px solid rgba(255,255,255,0.2)',
boxShadow: '0 8px 24px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.2)'
}} 
whileHover={{rotate: 5}} 
transition={{type: "spring",stiffness: 400,damping: 25}}
> 
<SafeIcon icon={level.icon} className="text-white text-lg sm:text-xl lg:text-2xl" /> 
</motion.div> 

{/* Details */} 
<div className="flex-1 min-w-0 text-center sm:text-left"> 
<h4 className="text-white font-bold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2 leading-tight"> 
{level.name} 
</h4> 
<p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed"> 
{level.description} 
</p> 

{/* Security Level Badge */} 
<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 mb-3 sm:mb-4"> 
<span 
className="text-xs px-2 py-1 sm:px-3 rounded-full font-semibold w-fit mx-auto sm:mx-0" 
style={{
background: 'linear-gradient(145deg,rgba(55,65,81,0.8) 0%,rgba(31,41,55,0.9) 100%)',
border: '1px solid rgba(75,85,99,0.4)',
color: 'white'
}}
> 
{level.security} Security 
</span> 
<div className="flex items-center justify-center sm:justify-start text-xs text-gray-400"> 
<SafeIcon icon={FiShield} className="mr-1" /> 
<span> 
{level.id==='standard' ? '99.9%' : level.id==='biometric' ? '99.99%' : level.id==='neural' ? '99.999%' : '100%'} secure 
</span> 
</div> 
</div> 

{/* Features (shown when selected) - Responsive grid */} 
{isActive && ( 
<motion.div 
className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2" 
initial={{opacity: 0,height: 0}} 
animate={{opacity: 1,height: 'auto'}} 
exit={{opacity: 0,height: 0}} 
transition={{duration: 0.3}}
> 
{level.features.map((feature,featureIndex)=> ( 
<div key={featureIndex} className="flex items-center text-gray-300 text-xs"> 
<div 
className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0" 
style={{background: `linear-gradient(145deg,${level.color.split(' ')[1]} 0%,${level.color.split(' ')[3]} 100%)`}}
/> 
<span className="truncate">{feature}</span> 
</div> 
))} 
</motion.div> 
)} 
</div> 
</div> 
</div>
</div>
</motion.div>
);})} 
</div> 

{/* Selected Security Details - Responsive layout */} 
<motion.div 
key={selectedLevel} 
className="p-4 sm:p-6 rounded-xl border" 
style={{
background: 'linear-gradient(145deg,rgba(17,24,39,0.8) 0%,rgba(31,41,55,0.6) 100%)',
border: '1px solid rgba(75,85,99,0.4)',
boxShadow: '0 8px 24px rgba(0,0,0,0.3),inset 0 1px 0 rgba(156,163,175,0.1)'
}} 
initial={{opacity: 0,y: 20}} 
animate={{opacity: 1,y: 0}} 
transition={{duration: 0.5}}
> 
<div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6"> 
<div 
className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto sm:mx-0" 
style={{
background: `linear-gradient(145deg,${selectedLevelData.color.split(' ')[1]} 0%,${selectedLevelData.color.split(' ')[3]} 100%)`,
border: '1px solid rgba(255,255,255,0.2)'
}}
> 
<SafeIcon icon={selectedLevelData.icon} className="text-white text-lg sm:text-xl" /> 
</div> 
<div className="flex-1 text-center sm:text-left"> 
<h4 className="text-white font-bold text-lg sm:text-xl mb-1">{selectedLevelData.name}</h4> 
<p className="text-gray-300 text-sm">{selectedLevelData.detailedDesc}</p> 
</div> 
{selectedLevelData.badge && ( 
<span 
className="text-xs font-bold px-2 py-1 rounded-full text-white flex-shrink-0 mx-auto sm:mx-0" 
style={{background: 'linear-gradient(145deg,rgba(249,115,22,0.9) 0%,rgba(239,68,68,0.8) 100%)'}}
> 
{selectedLevelData.badge} 
</span> 
)} 
</div> 

{/* Security Metrics - Responsive grid */} 
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4"> 
<div 
className="text-center p-3 rounded-lg" 
style={{
background: 'linear-gradient(145deg,rgba(55,65,81,0.6) 0%,rgba(31,41,55,0.8) 100%)',
border: '1px solid rgba(75,85,99,0.4)'
}}
> 
<SafeIcon icon={FiShield} className="text-blue-400 text-lg sm:text-xl mx-auto mb-2" /> 
<div className="text-white font-semibold text-sm">{selectedLevelData.security}</div> 
<div className="text-gray-400 text-xs">Security Level</div> 
</div> 
<div 
className="text-center p-3 rounded-lg" 
style={{
background: 'linear-gradient(145deg,rgba(55,65,81,0.6) 0%,rgba(31,41,55,0.8) 100%)',
border: '1px solid rgba(75,85,99,0.4)'
}}
> 
<div className="text-white font-semibold text-sm mb-2"> 
{selectedLevel==='standard' ? '99.9%' : selectedLevel==='biometric' ? '99.99%' : selectedLevel==='neural' ? '99.999%' : '100%'} 
</div> 
<div className="text-gray-400 text-xs">Protection Rate</div> 
</div> 
<div 
className="text-center p-3 rounded-lg" 
style={{
background: 'linear-gradient(145deg,rgba(55,65,81,0.6) 0%,rgba(31,41,55,0.8) 100%)',
border: '1px solid rgba(75,85,99,0.4)'
}}
> 
<div className="text-white font-semibold text-sm mb-2"> 
{selectedLevel==='quantum' ? '∞' : selectedLevel==='neural' ? '500+' : selectedLevel==='biometric' ? '50+' : '10+'} years 
</div> 
<div className="text-gray-400 text-xs">To Crack</div> 
</div> 
</div> 
</motion.div> 
</div> 
);
}

export default SecurityLevelSelector;