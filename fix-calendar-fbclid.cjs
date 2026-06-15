const fs = require('fs');

const path = 'src/components/CalendarModal.vue';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('getStoredFbParams')) {
  // Import it
  content = content.replace(
    "import { useContactStore } from '@/stores/contact'",
    "import { useContactStore } from '@/stores/contact'\nimport { getStoredFbParams } from '@/utils/fbclid'"
  );
  
  // Add it to the payload
  content = content.replace(
    "event_id: scheduleEventId,",
    "event_id: scheduleEventId,\n    ...getStoredFbParams(),"
  );
  
  fs.writeFileSync(path, content);
}

