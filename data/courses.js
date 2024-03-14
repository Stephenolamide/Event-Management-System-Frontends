import { useContext } from "react";
import client from "../api/client";
import { AuthContext } from "../context/AuthContext";

export const Course = [
    {
      "label": "ACCOUNTING",
      "value": "ACCOUNTING"
    },
    {
      "label": "AGRICULTURE",
      "value": "AGRICULTURE"
    },
    {
      "label": "AGRICULTURE IN AGRONOMY AND LANDSCAPE",
      "value": "AGRICULTURE IN AGRONOMY AND LANDSCAPE"
    },
    {
      "label": "ANATOMY",
      "value": "ANATOMY"
    },
    {
      "label":"ANIMAL SCIENCE",
      "value":"ANIMAL SCIENCE"
    },
    {
      "label": "BIOCHEMISTRY",
      "value": "BIOCHEMISTRY"
    },
    {
      "label": "BIOLOGY",
      "value": "BIOLOGY"
    },
    {
      "label": "BUSINESS ADMINISTRATION",
      "value": "BUSINESS ADMINISTRATION"
    },
    {
      "label": "BUSINESS EDUCATION",
      "value": "BUSINESS EDUCATION"
    },
    {
      "label": "CIVIL ENGINEERING",
      "value": "CIVIL ENGINEERING"
    },
    {
      "label": "CHEMISTRY",
      "value": "CHEMISTRY"
    },
    {
      "label": "CHRISTIAN RELIGIOUS STUDIES",
      "value": "CHRISTIAN RELIGIOUS STUDIES"
    },
    {
      "label": "COMPUTER ENGINEERING",
      "value": "COMPUTER ENGINEERING"
    },
    {
      "label": "COMPUTER SCIENCE",
      "value": "COMPUTER SCIENCE"
    },
    {
      "label": "COMPUTER SCIENCE (TECHNOLOGY)",
      "value": "COMPUTER SCIENCE (TECHNOLOGY)"
    },
    {
      "label": "COMPUTER INFORMATION SCIENCE",
      "value": "COMPUTER INFORMATION SCIENCE"
    },
    {
      "label": "ECONOMICS",
      "value": "ECONOMICS"
    },
    {
      "label": "ECONOMICS EDUCATION",
      "value": "ECONOMICS EDUCATION"
    },
    {
      "label": "EDUCATION AND ENGLISH LANGUAGE",
      "value": "EDUCATION AND ENGLISH LANGUAGE"
    },
    {
      "label": "EDUCATIONAL ADMINISTRATION AND PLANNING",
      "value": "EDUCATIONAL ADMINISTRATION AND PLANNING"
    },
    {
      "label": "ENGLISH AND LITERARY STUDIES",
      "value": "ENGLISH AND LITERARY STUDIES"
    },
    {
      "label": "ENGLISH STUDIES",
      "value": "ENGLISH STUDIES"
    },
    {
      "label": "FINANCE",
      "value": "FINANCE"
    },
    {
      "label": "FRENCH",
      "value": "FRENCH"
    },
    {
      "label": "FRENCH AND INTERNATIONAL RELATIONS",
      "value": "FRENCH AND INTERNATIONAL RELATIONS"
    },
    {
      "label": "GUIDANCE AND COUNSELLING",
      "value": "GUIDANCE AND COUNSELLING"
    },
    {
      "label": "HISTORY AND INTERNATIONAL STUDIES",
      "value": "HISTORY AND INTERNATIONAL STUDIES"
    },
    {
      "label": "INFORMATION RESOURCE MANAGEMENT",
      "value": "INFORMATION RESOURCE MANAGEMENT"
    },
    {
      "label": "INFORMATION TECHNOLOGY",
      "value": "INFORMATION TECHNOLOGY"
    },
    {
      "label": "LAW",
      "value": "LAW"
    },
    {
      "label": "MARKETING",
      "value": "MARKETING"
    },
    {
      "label": "MASS COMMUNICATION",
      "value": "MASS COMMUNICATION"
    },
    {
      "label": "MATHEMATICS",
      "value": "MATHEMATICS"
    },
    {
      "label": "MEDICAL LABORATORY SCIENCE",
      "value": "MEDICAL LABORATORY SCIENCE"
    },
    {
      "label": "MEDICINE AND SURGERY",
      "value": "MEDICINE AND SURGERY"
    },
    {
      "label": "MICROBIOLOGY",
      "value": "MICROBIOLOGY"
    },
    {
      "label": "MUSIC",
      "value": "MUSIC"
    },
    {
      "label": "NURSING SCIENCE",
      "value": "NURSING SCIENCE"
    },
    {
      "label": "NUTRITION AND DIETETICS",
      "value": "NUTRITION AND DIETETICS"
    },
    {
      "label": "PHYSICS WITH ELECTRONICS",
      "value": "PHYSICS WITH ELECTRONICS"
    },
    {
      "label": "PHYSIOLOGY",
      "value": "PHYSIOLOGY"
    },
    {
      "label": "POLITICAL SCIENCE",
      "value": "POLITICAL SCIENCE"
    },
    {
      "label": "POLITICAL SCIENCE / INTERNTIONAL LAW AND DIPLOMACY",
      "value": "POLITICAL SCIENCE / INTERNTIONAL LAW AND DIPLOMACY"
    },
    {
      "label": "PUBLIC ADMINISTRATION",
      "value": "PUBLIC ADMINISTRATION"
    },
    {
      "label": "PUBLIC HEALTH",
      "value": "PUBLIC HEALTH"
    },
    {
      "label": "RELIGIOUS STUDIES",
      "value": "RELIGIOUS STUDIES"
    },
    {
      "label": "SOCIAL WORK",
      "value": "SOCIAL WORK"
    },
    {
      "label": "SOFTWARE ENGINEERING",
      "value": "SOFTWARE ENGINEERING"
    },
    {
      "label": "TEACHER EDUCATION SCIENCE",
      "value": "TEACHER EDUCATION SCIENCE"
    },
    {
      "label": "DIRECT ENTRY",
      "value": "DIRECT ENTRY"
    },
    {
      "label": "JUPEB",
      "value": "JUPEB"
    }
  ];
  

  export const getAcademicData = async ()=>{
    const {userToken} = useContext(AuthContext)
    if(userToken !==null){
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "content-type": "application/json",
      },
    };

    try {
       const [res1, res2] = await Promise.all([
        client.get(`/association/getAssociations`, config),
        client.get(`/course/getCourseList`, config)
       ])

       if(res1.status === 200 && res2.status == 200){
        
        console.log("successful")
        return res1, res2
       }
    } catch (error) {
      console.log(error)
    }
  }
}



  export const Academic = 
  [
    {"label": "AGSA", "value": "AGSA"},
    {"label": "AIRMAS", "value": "AIRMAS"},
    {"label": "ALBU", "value": "ALBU"},
    {"label": "ASSON", "value": "ASSON"},
    {"label": "BASSA", "value": "BASSA"},
    {"label": "BSA", "value": "BSA"},
    {"label": "BUAMS", "value": "BUAMS"},
    {"label": "BUCC", "value": "BUCC"},
    {"label": "BUNSA", "value": "BUNSA"},
    {"label": "BUPSA", "value": "BUPSA"},
    {"label": "BUTC", "value": "BUTC"},
    {"label": "EDSA", "value": "EDSA"},
    {"label": "ESA", "value": "ESA"},
    {"label": "FINSA", "value": "FINSA"},
    {"label": "HEDESA", "value": "HEDESA"},
    {"label": "ILDSA", "value": "ILDSA"},
    {"label": "LALSA", "value": "LALSA"},
    {"label": "LAWSAN", "value": "LAWSAN"},
    {"label": "MCA", "value": "MCA"},
    {"label": "MCSA", "value": "MCSA"},
    {"label": "NAMS", "value": "NAMS"},
    {"label": "NIMELSSA", "value": "NIMELSSA"},
    {"label": "NUDSA", "value": "NUDSA"},
    {"label": "PASA", "value": "PASA"},
    {"label": "POLSA", "value": "POLSA"},
    {"label": "PUHSA", "value": "PUHSA"},
    {"label": "SAMBA", "value": "SAMBA"},
    {"label": "SWAHSSA", "value": "SWAHSSA"}
]
