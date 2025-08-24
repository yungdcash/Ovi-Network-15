import React,{useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiScan,FiCheck,FiEye,FiFingerprint}=FiIcons;

function BiometricAuth({onBack,onComplete}) {
const [stage,setStage]=useState('fingerprint');
const [progress,setProgress]=useState(0);
const [scanning,setScanning]=useState(false);
const [completed,setCompleted]=useState({fingerprint: false,face: false,voice: false});

const stages=[ 
{id: 'fingerprint',name: 'Fingerprint Scan',icon: FiFingerprint,description: 'Place your finger on the sensor',color: 'from-blue-500 to-cyan-500'},
{id: 'face',name: 'Face Recognition',icon: FiEye,description: 'Look at the camera for face scan',color: 'from-purple-500 to-pink-500'},
{id: 'voice',name: 'Voice Pattern',icon: FiScan,description: 'Say "Ovi Network Secure Access"',color: 'from-green-500 to-teal-500'} 
];

const currentStageData=stages.find(s=> s.id===stage);

const startScan=async ()=> {
setScanning(true);
setProgress(0);

// Simulate scanning progress 
for (let i=0;i <=100;i +=2) {
await new Promise(resolve=> setTimeout(resolve,50));
setProgress(i);
} 

// Mark as completed 
setCompleted(prev=> ({...prev,[stage]: true}));
setScanning(false);

// Move to next stage or complete 
const currentIndex=stages.findIndex(s=> s.id===stage);
if (currentIndex < stages.length - 1) {
setTimeout(()=> {
setStage(stages[currentIndex + 1].id);
setProgress(0);
},1000);
} else {
setTimeout(()=> {
onComplete();
},1500);
}
};

const allCompleted=Object.values(completed).every(Boolean);

return ( 
<motion.div initial={{opacity: 0,y: 20}} animate={{opacity: 1,y: 0}} exit={{opacity: 0,y: -20}} className="text-center" > 
<button onClick={onBack} className="flex items-center text-white/60 hover:text-white mb-6 transition-colors" > 
← Back to Security Options 
</button> 

<h3 className="text-2xl font-bold text-white mb-6">Biometric Authentication Setup</h3> 

{/* Progress Indicators */} 
<div className="flex justify-center space-x-4 mb-8"> 
{stages.map((stageItem,index)=> ( 
<div key={stageItem.id} className="flex flex-col items-center space-y-2"> 
<div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${completed[stageItem.id] ? 'bg-green-500 text-white' : stage===stageItem.id ? `bg-gradient-to-r ${stageItem.color} text-white animate-pulse` : 'bg-white/10 text-white/40'}`}> 
{completed[stageItem.id] ? ( 
<SafeIcon icon={FiCheck} /> 
) : ( 
<SafeIcon icon={stageItem.icon} /> 
)} 
</div> 
<span className={`text-xs ${completed[stageItem.id] || stage===stageItem.id ? 'text-white' : 'text-white/40'}`}> 
{stageItem.name} 
</span> 
</div> 
))} 
</div> 

{!allCompleted && ( 
<> 
{/* Current Stage */} 
<motion.div key={stage} className="mb-8" initial={{scale: 0.8,opacity: 0}} animate={{scale: 1,opacity: 1}} transition={{type: "spring",stiffness: 300,damping: 30}} > 
<div className={`w-32 h-32 mx-auto bg-gradient-to-r ${currentStageData.color} rounded-full flex items-center justify-center mb-4 ${scanning ? 'animate-pulse' : ''}`}> 
<SafeIcon icon={currentStageData.icon} className="text-white text-4xl" /> 
</div> 
<h4 className="text-xl font-semibold text-white mb-2">{currentStageData.name}</h4> 
<p className="text-white/60 mb-6">{currentStageData.description}</p> 

{scanning && ( 
<div className="mb-6"> 
<div className="w-full bg-white/10 rounded-full h-2 mb-2"> 
<motion.div className={`h-full bg-gradient-to-r ${currentStageData.color} rounded-full`} initial={{width: 0}} animate={{width: `${progress}%`}} transition={{duration: 0.1}} /> 
</div> 
<p className="text-white/80 text-sm">Scanning... {progress}%</p> 
</div> 
)} 
</motion.div> 

{!scanning && !completed[stage] && ( 
<motion.button onClick={startScan} className={`bg-gradient-to-r ${currentStageData.color} px-8 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-all`} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} > 
Start {currentStageData.name} 
</motion.button> 
)} 

{completed[stage] && !allCompleted && ( 
<motion.div className="text-green-400 flex items-center justify-center space-x-2" initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring",stiffness: 500,damping: 30}} > 
<SafeIcon icon={FiCheck} /> 
<span>Completed! Moving to next step...</span> 
</motion.div> 
)} 
</> 
)} 

{allCompleted && ( 
<motion.div className="text-center" initial={{scale: 0.8,opacity: 0}} animate={{scale: 1,opacity: 1}} transition={{type: "spring",stiffness: 300,damping: 30}} > 
<div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4"> 
<SafeIcon icon={FiCheck} className="text-white text-3xl" /> 
</div> 
<h4 className="text-2xl font-bold text-white mb-2">Biometric Setup Complete!</h4> 
<p className="text-green-400">Your account is now secured with quantum-grade biometric authentication.</p> 
</motion.div> 
)} 
</motion.div> 
);
}

export default BiometricAuth;