import BulletinPage from '@/components/BulletinPage'

const july13BulletinData = {
  churchName: "UKIAH UNITED METHODIST CHURCH",
  motto: "Love God • Live Compassion",
  date: "JULY 13, 2025",
  theme: "WHOLLY HUMAN– HOLY DIVINE",
  contactInfo: {
    address: "270 N. Pine St. (Mailing: P.O. Box 323), Ukiah, CA 95482",
    website: "www.ukiahumc.org",
    wifi: {
      network: "UUMC Friends",
      password: "lovewins"
    },
    staff: [
      {
        name: "Rev. Dr. Michele Robbins",
        title: "Pastor",
        phone: "707.462.3360 x12",
        email: "pastor@ukiahumc.org"
      },
      {
        title: "Soul Purpose Band Director",
        email: "soulpurposeband@ukiahumc.org"
      },
      {
        title: "Church Office",
        phone: "707.462.3360",
        email: "office@ukiahumc.org"
      }
    ]
  },
  instructions: "The words in black bold are spoken or sung by the congregation. *Indicates when to rise in body or spirit. Please, no food or beverages are allowed in the Sanctuary.",
  hymnalKey: "UMH--United Methodist (Blue), TFWS--The Faith We Sing (Black), W&S--Worship & Song (Green)",
  serviceOrder: [
    {
      type: "hymn",
      title: "PRELUDE",
      hymnTitle: "Come, Thou Fount of Every Blessing",
      number: "#400",
      source: "UMH"
    },
    {
      type: "sectionTitle",
      title: "WELCOME"
    },
    {
      type: "thresholdMoment",
      title: "THRESHOLD MOMENT",
      content: [
        {
          speaker: "Leader",
          text: ""For those who lose their life for my sake will find it." — Matthew 16:25"
        },
        {
          speaker: "Reflection",
          text: "We end our series hearing a phrase we heard in the beginning: "This is my Son." Truly we may say that Jesus was the Son of God and yet this scripture also calls him the Son of Man, or translated another way, "The Human One." Perhaps the invitation to "lose our lives" because of him is an invitation to live our lives knowing our intimate and holy connection with God that is intertwined with our connection to all humankind. When we lose our isolating self-focus for the sake of God and others, we are transfigured into the light of love that lives forever. This is the invitation to fully engage with life without fear!"
        }
      ]
    },
    {
      type: "hymn",
      title: "WE SING",
      hymnTitle: "Love Divine, All Loves Excelling",
      verse: "Verse 2",
      number: "#384",
      source: "UMH"
    },
    {
      type: "responsiveReading",
      title: "CALL TO WORSHIP",
      content: [
        {
          speaker: "Liturgist",
          text: "It is easy to stand here in the valley of our comfort.",
          isCongregation: false
        },
        {
          speaker: "All",
          text: "We know what to expect and what is expected of us.",
          isCongregation: true
        },
        {
          speaker: "Liturgist",  
          text: "But Christ calls us to the mountain top to receive a new vision.",
          isCongregation: false
        },
        {
          speaker: "All",
          text: "We are not sure we are ready for that.",
          isCongregation: true
        },
        {
          speaker: "Liturgist",
          text: "Place your hope and trust in Christ, for He is your guide.",
          isCongregation: false
        },
        {
          speaker: "All",
          text: "Let us open our hearts to Christ, ready for the vision he places before us. AMEN.",
          isCongregation: true
        }
      ]
    },
    {
      type: "hymn",
      title: "PRAISING",
      hymnTitle: "Open the Eyes of My Heart Lord",
      number: "#3008",
      source: "W&S"
    },
    {
      type: "sectionTitle",
      title: "YOUNG & YOUNG AT HEART TIME"
    },
    {
      type: "contemporaryReading",
      title: "CONTEMPORARY READING",
      poemTitle: "Standing",
      author: "Kay Lieberknecht",
      content: [
        "Standing…",
        "Have I got standing to speak here?",
        "Standing around…",
        "Waiting, watchful, trying to be inconspicuous.",
        "Standing for…",
        "What I've been healing into, what my wounds have taught me.",
        "Standing by…",
        "Knowing that I may be - no, will be - needed.",
        "Standing with…",
        "So many other wounded healers.",
        "Standing on…",
        "Sacred ground, wisdom and joy hard-earned yet given for free.",
        "Standing tall…",
        "Proud to be humbled, perfectly imperfect, forgiven.",
        "Standing joke…",
        "Does that really fit here? I do laugh, giggles of grace.",
        "Standing still…",
        "As long as it takes, as quietly as necessary.",
        "Standing up…",
        "For you, for them, for all Creation — We're all worth it.",
        "Standing beside…",
        "You who are accountable and attentive.",
        "Standing because…",
        "Love stands under me, under us."
      ]
    },
    {
      type: "lordsPrayer",
      title: "COMMUNITY PRAYER ~ THE LORD'S PRAYER (sung in echo)",
      content: [
        "Our Mother, Father, Our Mother, Father",
        "Who art in heaven, Who art in heaven", 
        "Hallowed be thy name, Hallowed be thy name",
        "Thy Kingdom come, Thy Kingdom come",
        "Thy will be done, Thy will be done",
        "On earth as it is in heaven, On earth as it is in heaven",
        "Give us this day, Give us this day",
        "Our daily bread, Our daily bread",
        "And forgive us all our sins, And forgive us all our sins",
        "And lead us not, And lead us not",
        "Into temptation, Into temptation",
        "But deliver us from evil, But deliver us from evil",
        "For yours is the Kingdom and the power and the glory",
        "Forever, And ever",
        "Our Mother, Father, Our Mother, Father",
        "Who art in heaven, Who art in heaven",
        "Hallowed be thy name, Hallowed be thy name"
      ]
    },
    {
      type: "scriptureReading",
      title: "ANCIENT READING",
      reference: "Matthew 16:24-17:8",
      version: "The New Revised Standard Version Updated Edition Bible",
      content: [
        "Then Jesus told his disciples, \"If any wish to come after me, let them deny themselves and take up their cross and follow me. For those who want to save their life will lose it, and those who lose their life for my sake will find it. For what will it profit them if they gain the whole world but forfeit their life? Or what will they give in return for their life?",
        "\"For the Son of Man is to come with his angels in the glory of his Father, and then he will repay everyone for what has been done. Truly I tell you, there are some standing here who will not taste death before they see the Son of Man coming in his kingdom.\"",
        "Six days later, Jesus took with him Peter and James and his brother John and led them up a high mountain, by themselves. And he was transfigured before them, and his face shone like the sun, and his clothes became bright as light. Suddenly there appeared to them Moses and Elijah, talking with him. Then Peter said to Jesus, \"Lord, it is good for us to be here; if you wish, I will set up three tents here, one for you, one for Moses, and one for Elijah.\" While he was still speaking, suddenly a bright cloud overshadowed them, and a voice from the cloud said, \"This is my Son, the Beloved; with him I am well pleased; listen to him!\" When the disciples heard this, they fell to the ground and were overcome by fear. But Jesus came and touched them, saying, \"Get up and do not be afraid.\" And when they raised their eyes, they saw no one except Jesus himself alone."
      ]
    },
    {
      type: "hymn",
      title: "WE SING",
      hymnTitle: "Swiftly Pass the Clouds of Glory",
      number: "#2102",
      source: "TFWS"
    },
    {
      type: "message",
      title: "MESSAGE",
      messageTitle: "Transfiguration",
      speaker: "Rev. Dr. Michele Robbins"
    },
    {
      type: "offertory",
      title: "OFFERTORY",
      song: "Unwritten",
      artist: "Natasha Bedingfield",
      offeringNote: "Offerings can be placed in the basket on the table, online at ukiahumc.org, or mailed to PO Box 323, Ukiah"
    },
    {
      type: "asteriskedItem",
      title: "*DOXOLOGY",
      hymnTitle: "Praise God from Whom All Blessings Flow",
      number: "#94",
      source: "UMH"
    },
    {
      type: "membershipStatement",
      title: "*MEMBERSHIP STATEMENT",
      content: "Members of the Ukiah United Methodist Church accept the freedom God gives us to resist evil, injustice, and oppression in whatever forms they present themselves. We welcome opportunities to bring God's love to the world in as many ways as we can. We promise to uphold our beloved church by our prayers, our presence, our gifts, our service, and our witness."
    },
    {
      type: "hymn",
      title: "GETTING STRONG",
      hymnTitle: "Shine, Jesus Shine",
      number: "#2173",
      source: "TFWS"
    },
    {
      type: "announcements",
      title: "OPPORTUNITIES FOR MINISTRY",
      items: [
        "If you are thinking of becoming a member, please join Pastor Michele for **Methodism 101 part 2** after Worship in the Social Hall.",
        "**Book Study** will start this week, July 16, for 8 Wednesdays at 3 pm in room #106. Contact Linda, 707.462.3185, about ordering the book \"Practicing Hope\" by Mission U for $15.",
        "**July 27** is Luna's last Sunday with us. We will be sending her off with love during Worship.",
        "**Gentle Yoga** Every Wednesday and Saturday with Hand weights at 8:15 am",
        "**Gentle Yoga** at 8:30 am in the Social Hall led by Pastor Michele",
        "**Recycling** Annie is collecting CRV bottles & cans, to benefit Ukiah UMC. Text or call Annie 707-513-9634 for pickups and more information.",
        "**The Building Bridges Homeless Resource Center** Ukiah UMC is a great supporter of Building Bridges Homeless Resource Center at 1045 S. State Street in Ukiah. If you would like to donate to Building Bridges Homeless Resource Center below is a list of needed items. All donations can be dropped at HRC weekdays between 9 a.m. and 5 p.m. OR on my front porch at any time. Thank you to everyone who donates! Trudy (408 W. Mill St) THANK YOU SO MUCH!",
        "**Items currently needed are:** toilet paper, paper towels, laundry soap, sleeping bags, blankets, towels, socks, pens, tea bags, hot cocoa powder, instant coffee, apple cider, cups, plates, bowls, toaster, dog food, cold & flu meds, snack food, vegetable starts for their garden."
      ]
    },
    {
      type: "goForIt",
      title: "GO FOR IT!",
      attribution: "John Wesley",
      content: [
        { side: "South", text: "Do all the good you can," },
        { side: "North", text: "By all the means you can," },
        { side: "South", text: "In all the ways you can," },
        { side: "North", text: "In all the places you can," },
        { side: "South", text: "At all the times you can," },
        { side: "North", text: "To all the people you can," },
        { side: "All", text: "As long as ever you can. Amen." }
      ]
    },
    {
      type: "sectionTitle",
      title: "BLESSING"
    },
    {
      type: "asteriskedItem",
      title: "*STEPPING OUT",
      hymnTitle: "Every Time I Feel the Spirit",
      number: "#404",
      source: "UMH"
    },
    {
      type: "welcomingStatement",
      title: "We are a Welcoming & Affirming Congregation:",
      content: "We welcome all persons into full participation in the life of the congregation regardless of age, gender identity, race, or ethnic background, sexual orientation, marriage status, or physical or mental condition."
    }
  ]
}

export default function July13Bulletin() {
  return <BulletinPage data={july13BulletinData} />
}