/**
 * create alert validation
 * @param {*} msg 
 * @param {*} type 
 */
const alertMessage=(msg,type="danger")=>{
  return`<p class="alert alert-${type} d-flex justify-content-between">${msg}<button class="btn-close" data-bs-dismiss="alert"></button></p>`;
    
}


// isEmail
/**
 * check Email validation
 * @param {*} email 
 * @returns 
 */
const isEmail = (email)=>{

  const pattern = /^[a-z0-9\._]{1,}@[a-z0-9]{2,}\.[a-z]{2,4}$/
  return pattern.test(email)
}

// isPhone Number 
/**
 * phone number check
 * @param {*} phone 
 * @returns 
 */

const  isPhone = (phone)=>{
  const pattern = /^(\+8801|8801|01)[0-9]{9}$/;
    return pattern.test(phone)
}

function unique_id() {
  // Current timestamp in milliseconds
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);

  // Generate a random 8-character hexadecimal string
  const randomPart = (Math.random() * 0xffffffff | 0).toString(16);

  // Create a unique ID by concatenating timestamp and random part
  const uniqueId = timestamp + 'xxxxxxxxxxxxxxxx'.substr(0, 8 - randomPart.length) + randomPart;

  return uniqueId;
}


// const timeAgo = (date)=> {
//   const seconds = Math.floor((new Date() - date) / 1000);
//   let interval = Math.floor(seconds / 31536000);
// 
//   if (interval >= 1) {
//     return interval + " year" + (interval === 1 ? "" : "s") + " ago";
//   }
//   interval = Math.floor(seconds / 2592000);
//   if (interval >= 1) {
//     return interval + " month" + (interval === 1 ? "" : "s") + " ago";
//   }
//   interval = Math.floor(seconds / 86400);
//   if (interval >= 1) {
//     return interval + " day" + (interval === 1 ? "" : "s") + " ago";
//   }
//   interval = Math.floor(seconds / 3600);
//   if (interval >= 1) {
//     return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
//   }
//   interval = Math.floor(seconds / 60);
//   if (interval >= 1) {
//     return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
//   }
//   return Math.floor(seconds) + " second" + (Math.floor(seconds) === 1 ? "" : "s") + " ago";
// }

// function timeAgo(date) {
//   const seconds = Math.floor((new Date() - date) / 1000);
//   let interval = Math.floor(seconds / 31536000);
// 
//   if (interval >= 1) {
//     return interval + " year" + (interval === 1 ? "" : "s") + " ago";
//   }
//   interval = Math.floor(seconds / 2592000);
//   if (interval >= 1) {
//     return interval + " month" + (interval === 1 ? "" : "s") + " ago";
//   }
//   interval = Math.floor(seconds / 86400);
//   if (interval >= 1) {
//     return interval + " day" + (interval === 1 ? "" : "s") + " ago";
//   }
//   interval = Math.floor(seconds / 3600);
//   if (interval >= 1) {
//     return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
//   }
//   interval = Math.floor(seconds / 60);
//   if (interval >= 1) {
//     return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
//   }
//   return Math.floor(seconds) + " second" + (Math.floor(seconds) === 1 ? "" : "s") + " ago";
// }
// 


const timeAgo = (postDate) => {
  const currentDate = new Date();
  const diff = currentDate - postDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};
