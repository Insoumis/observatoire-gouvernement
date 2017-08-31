export default {
  nodes: [
    { id: 'Cab-Philippe', group: 'cabinet', image: 'philippe' },
    { id: 'Cab-Castaner', group: 'cabinet', image: 'castaner' },
    { id: 'Accor', group: 'private', image: 'accor' },
    { id: 'Agence-RVA', group: 'private', image: 'rva' },
    { id: 'Areva', group: 'private', image: 'areva' },
    { id: 'M6', group: 'private', image: 'm6' },

  ],
  links: [
    { source: 'Cab-Philippe', target: 'Areva', group: 'lobby' },
    { source: 'Cab-Philippe', target: 'Accor', group: 'lobby' },
    { source: 'Cab-Philippe', target: 'M6', group: 'lobby' },
    { source: 'Cab-Castaner', target: 'Agence-RVA', group: 'lobby' },
  ],
};
