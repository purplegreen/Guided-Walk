const slots = [
  {
    id: 1,
    name: "Biotope",
    category: "Listening",
    alreadyPlayedInSeconds: 0,
    audio: "Tchaikovsky_Nocturne__orch.mp3",
    image: "https://via.placeholder.com/400x350?text=Biotope",
    duration: 270,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac placerat vestibulum lectus mauris ultrices eros in cursus. Tellus id interdum velit laoreet id donec ultrices. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Venenatis tellus in metus vulputate eu. Ac orci phasellus egestas tellus rutrum tellus. Morbi tincidunt augue interdum velit euismod in. Integer enim neque volutpat ac tincidunt vitae. Diam quis enim lobortis scelerisque fermentum dui faucibus. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Velit laoreet id donec ultrices tincidunt arcu. Maecenas sed enim ut sem viverra aliquet eget sit. Amet aliquam id diam maecenas ultricies mi. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Mattis vulputate enim nulla aliquet porttitor.",
    color: "#071013",
    location: { lat: 52.527686, lng: 13.400372 }
  },
  {
    id: 2,
    name: "Breathe",
    category: "Meditation",
    alreadyPlayedInSeconds: 0,
    audio: "Tchaikovsky_Nocturne__orch.mp3",
    image: "https://via.placeholder.com/400x350?text=Breathe",
    duration: 270,
    text:
      "Duis ut diam quam nulla porttitor. Aliquet enim tortor at auctor urna. Ultricies mi eget mauris pharetra. Gravida rutrum quisque non tellus orci. At urna condimentum mattis pellentesque id. Blandit turpis cursus in hac habitasse platea. Erat nam at lectus urna duis convallis convallis. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Habitant morbi tristique senectus et netus et malesuada fames ac. Tortor consequat id porta nibh venenatis cras. Magnis dis parturient montes nascetur. Eleifend mi in nulla posuere. Massa tincidunt dui ut ornare lectus sit amet est. Nam at lectus urna duis convallis convallis tellus id. In eu mi bibendum neque egestas congue. Fermentum leo vel orci porta. Proin libero nunc consequat interdum varius. Morbi quis commodo odio aenean sed adipiscing. Augue lacus viverra vitae congue eu. Adipiscing elit pellentesque habitant morbi tristique",
    color: "#EB5160",
    location: { lat: 52.526283, lng: 13.407442 }
  },
  {
    id: 3,
    name: "Stones",
    category: "Observation",
    alreadyPlayedInSeconds: 0,
    audio: "Vivaldi_Sonata_eminor_.mp3",
    image: "https://via.placeholder.com/400x350?text=Stones",
    duration: 184,
    text:
      "Quis lectus nulla at volutpat diam ut venenatis tellus in. Augue interdum velit euismod in pellentesque massa. Eget duis at tellus at urna. Proin nibh nisl condimentum id venenatis. Tellus rutrum tellus pellentesque eu tincidunt. Eu consequat ac felis donec. Risus at ultrices mi tempus imperdiet nulla malesuada. Praesent tristique magna sit amet purus. Dui nunc mattis enim ut tellus elementum sagittis. Pulvinar sapien et ligula ullamcorper malesuada proin. Nunc mattis enim ut tellus elementum. Sed viverra tellus in hac. Aliquam sem et tortor consequat id porta. Condimentum lacinia quis vel eros donec ac odio. Pretium lectus quam id leo in vitae. Amet nisl purus in mollis nunc sed id semper. Massa tempor nec feugiat nisl pretium fusce id velit. Neque convallis a cras semper auctor neque.",
    color: "#B7999C",
    location: { lat: 52.523737, lng: 13.402282 }
  },
  {
    id: 4,
    name: "Sandy",
    category: "Meditation",
    alreadyPlayedInSeconds: 0,
    audio: "Tchaikovsky_Nocturne__orch.mp3",
    image: "https://via.placeholder.com/400x350?text=Sandy",
    duration: 270,
    text:
      "Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. Donec et odio pellentesque diam. Vel risus commodo viverra maecenas accumsan lacus. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Vitae tempus quam pellentesque nec. Ut tellus elementum sagittis vitae et leo duis ut. Enim praesent elementum facilisis leo vel fringilla est. Nibh sit amet commodo nulla. Ac tortor vitae purus faucibus ornare. Et tortor at risus viverra adipiscing. Euismod quis viverra nibh cras pulvinar mattis nunc sed. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Ligula ullamcorper malesuada proin libero nunc consequat. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Id neque aliquam vestibulum morbi blandit cursus risus. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Diam quam nulla porttitor massa id neque aliquam vestibulum. Nunc consequat interdum varius sit amet mattis. Aliquet nibh praesent tristique magna sit.",
    color: "#AAAAAA",
    location: { lat: 52.525434, lng: 13.409416 }
  },
  {
    id: 5,
    name: "Float",
    category: "In Water",
    alreadyPlayedInSeconds: 0,
    audio: "Tchaikovsky_Nocturne__orch.mp3",
    image: "https://via.placeholder.com/400x350?text=Float",
    duration: 270,
    text:
      "Turpis egestas sed tempus urna et pharetra pharetra. Nulla facilisi cras fermentum odio eu. Vitae sapien pellentesque habitant morbi tristique senectus et. Etiam non quam lacus suspendisse faucibus interdum posuere. Cursus risus at ultrices mi. Integer feugiat scelerisque varius morbi enim nunc faucibus a. Semper viverra nam libero justo laoreet sit. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Egestas dui id ornare arcu odio ut sem nulla pharetra. Luctus venenatis lectus magna fringilla. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Duis convallis convallis tellus id. Tortor pretium viverra suspendisse potenti.",
    color: "#DFE0E2",
    location: { lat: 52.52345, lng: 13.407228 }
  },
  {
    id: 6,
    name: "Power of Imagination",
    category: "Listening",
    alreadyPlayedInSeconds: 0,
    audio: "Vivaldi_Sonata_eminor_.mp3",
    image: "https://via.placeholder.com/400x350?text=Imagination",
    duration: 184,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    color: "#071013"
  }
];

// comment out for now because it downloads everything before even needed
// slots.forEach(s => {
//   let audio = new Audio(s.audio);
//   audio.onloadedmetadata = () => {
//     s.duration = parseInt(audio.duration, 10);
//   };
// });
// randomly select slots for the composition for now
const walkpaths = [
  {
    id: 90,
    name: "Slowly On",
    composition: [slots[0], slots[1], slots[2]]
  },
  {
    id: 91,
    name: "About to Meditate",
    composition: [slots[3], slots[4], slots[5]]
  },
  {
    id: 92,
    name: "Another Walkpath",
    composition: [slots[0], slots[2]]
  }
];

module.exports = { slots, walkpaths };
