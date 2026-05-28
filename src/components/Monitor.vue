<template>
  <section class="view-switch">
    <span class="view-switch-label">Show Mode: {{ showMode }}</span>
    <div class="view-switch-buttons">
      <v-btn
        :variant="showMode === 'all' ? 'tonal' : 'outlined'"
        @click="showMode = 'all'"
      >
        All
      </v-btn>
      <v-btn
        :variant="showMode === 'real-time' ? 'tonal' : 'outlined'"
        @click="showMode = 'real-time'"
      >
        Real Time
      </v-btn>
      <v-btn
        :variant="showMode === 'playback' ? 'tonal' : 'outlined'"
        @click="showMode = 'playback'"
      >
        Playback
      </v-btn>
    </div>
  </section>

  <section class="input-video-url">
    <v-text-field
      v-model="newVideoUrl"
      placeholder="Paste video URL"
      dense
      hide-details
      variant="outlined"
      class="video-url-input"
    />
    <v-btn variant="tonal" @click="loadVideoUrl">Load</v-btn>
    <v-btn variant="outlined" @click="openInNewTab">Open</v-btn>
  </section>

  <div class="monitor-page" :class="{ 'single-view': showMode !== 'all' }">
    <!--------------------------->
    <!-- Monitor Real Time Section -->
    <!--------------------------->
    <section class="monitor-live" v-if="showMode !== 'playback'">
      <h1>Real Time</h1>
      <div class="video-wrapper">
        <iframe
          :src="videoSrc"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>

      <div class="details-grid">
        <div
          class="detail-item"
          v-for="item in realtimeDetailItems"
          :key="item.label"
        >
          <span class="detail-label">{{ item.label }}</span>
          <v-text-field
            v-if="item.input === 'text'"
            v-model="item.value"
            variant="outlined"
            hide-details
            dense
          />
          <v-select
            v-else-if="item.input === 'select'"
            v-model="item.value"
            :items="[
              { text: 'Main stream', value: 1 },
              { text: 'Sub stream', value: 0 },
            ]"
            item-title="text"
            item-value="value"
            variant="outlined"
            hide-details
            dense
          />
          <v-checkbox
            v-else-if="item.input === 'checkbox'"
            v-model="item.value"
            variant="outlined"
            hide-details
            dense
          />
          <DateTimeComponent
            v-else-if="item.input === 'datetime'"
            v-model="item.value"
            :label="item.label"
          />
        </div>
      </div>

      <section class="button-group">
        <div v-for="v in realTimeBtns" :key="v">
          <v-btn variant="tonal" @click="handleBtnClick(v)">{{ v }}</v-btn>
        </div>
      </section>
    </section>

    <!--------------------------->
    <!-- Monitor Video playback Section -->
    <!--------------------------->
    <section class="monitor-live" v-if="showMode !== 'real-time'">
      <h1>Video Playback</h1>
      <div class="video-wrapper">
        <iframe
          :src="videoSrc"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>

      <div class="details-grid">
        <div
          class="detail-item"
          v-for="item in playbackDetailItems"
          :key="item.label"
        >
          <span class="detail-label">{{ item.label }}</span>
          <v-text-field
            v-if="item.input === 'text'"
            v-model="item.value"
            variant="outlined"
            hide-details
            dense
          />
          <v-select
            v-else-if="item.input === 'select'"
            v-model="item.value"
            :items="[
              { text: 'Main stream', value: 1 },
              { text: 'Sub stream', value: 0 },
            ]"
            item-title="text"
            item-value="value"
            variant="outlined"
            hide-details
            dense
          />
          <v-checkbox
            v-else-if="item.input === 'checkbox'"
            v-model="item.value"
            variant="outlined"
            hide-details
            dense
          />
          <DateTimeComponent
            v-else-if="item.input === 'datetime'"
            v-model="item.value"
          />
        </div>
      </div>
      <section class="button-group">
        <div v-for="v in playbackBtns" :key="v">
          <v-btn variant="tonal" @click="handleBtnClick(v)">{{ v }}</v-btn>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DateTimeComponent from "./input/DateTimeComponent.vue";
import { queryGtOfDevice } from "@/stores/api.ts";

const rawVideoUrl = ref(
  "https://superhero.mobileinnovation.asia/vss/apiPage/RealVideo.html?token=deb4cc288714456aa510c3cef0f6b193&deviceId=31086000100&chs=1&stream=0&wnum=1&panel=1&buffer=2000",
);
const videoSrc = ref(
  "/vss/apiPage/RealVideo.html?token=deb4cc288714456aa510c3cef0f6b193&deviceId=31086000100&chs=1&stream=0&wnum=1&panel=1&buffer=2000",
);

const monitorData = ref({
  ip: "192.168.1.100",
  prot: "RTSP",
  deviceID: "Device123",
  channel: "Channel 1",
  stream: 1,
  openAudio: true,
  cacheDuration: "5s",
  currentUsername: "admin",
  startTime: "2024-06-01 10:00:00",
  endTime: "2024-06-01 11:00:00",
  speed: "1x",
});

const realTimeBtns = [
  "Play",
  "Stop",
  "Pause",
  "Resume Play",
  "Turn on sound",
  "Turn off sound",
];
const playbackBtns = [
  "Playback",
  "x0",
  "x1",
  "x2",
  "x4",
  "x8",
  "x16",
  "Stop",
  "Pause",
  "Resume Play",
  "Turn on sound",
  "Turn off sound",
];

const showMode = ref("all");
const newVideoUrl = ref(rawVideoUrl.value);

const loadVideoUrl = () => {
  if (!newVideoUrl.value) return;
  rawVideoUrl.value = newVideoUrl.value;
  videoSrc.value = decodeVideoUrl(newVideoUrl.value);
};

const openInNewTab = () => {
  const url = newVideoUrl.value || rawVideoUrl.value || videoSrc.value;
  try {
    window.open(url, "_blank");
  } catch (e) {
    console.warn("Unable to open new tab", e);
  }
};

const realtimeDetailItems = computed(() => [
  // { label: "Ip", value: monitorData.value.ip, input: "text" },
  // { label: "Prot", value: monitorData.value.prot, input: "text" },
  { label: "deviceID", value: monitorData.value.deviceID, input: "text" },
  { label: "channel", value: monitorData.value.channel, input: "text" },
  { label: "stream ", value: monitorData.value.stream, input: "select" },
  {
    label: "Open Audio",
    value: monitorData.value.openAudio ? true : false,
    input: "checkbox",
  },
  {
    label: "Cache duration",
    value: monitorData.value.cacheDuration,
    input: "text",
  },
  {
    label: "Current username",
    value: monitorData.value.currentUsername,
    input: "text",
  },
  {
    label: "chs",
    value: monitorData.value.chs,
    input: "text",
  },
]);

const playbackDetailItems = computed(() => [
  ...realtimeDetailItems.value,
  {
    label: "Start Time",
    value: monitorData.value.startTime,
    input: "datetime",
  },
  {
    label: "End Time",
    value: monitorData.value.endTime,
    input: "datetime",
  },
  {
    label: "Speed",
    value: monitorData.value.speed,
    input: "text",
  },
]);

const videoUrlParams = ref({});

const decodeVideoUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    const params = {};
    parsedUrl.searchParams.forEach((value, key) => {
      params[key] = /^[0-9]+$/.test(value) ? Number(value) : value;
    });

    videoUrlParams.value = params;

    console.log("Decoded URL parameters:", params);

    if (params.deviceId) {
      monitorData.value.deviceID = params.deviceId;
    }
    if (params.stream !== undefined) {
      if (params.stream !== 0 && params.stream !== 1) {
        console.warn(
          `Unexpected stream value: ${params.stream}. Expected 0 or 1.`,
        );
      }
      if (params.stream === 0) {
        showMode.value = "playback";
      }
      monitorData.value.stream = params.stream;
    }
    if (params.wnum !== undefined) {
      monitorData.value.channel = params.wnum;
    }
    if (params.chs !== undefined) {
      monitorData.value.chs = params.chs;
    }

    if (parsedUrl.origin === "https://superhero.mobileinnovation.asia") {
      return parsedUrl.pathname + parsedUrl.search;
    }

    return url;
  } catch (e) {
    console.error("Error decoding URL:", e);
    return url; // Return original URL if decoding fails
  }
};

const getDeviceInfo = async (deviceId) => {
  console.log(`Fetching device info for deviceId: ${deviceId}`);
  try {
    const response = await queryGtOfDevice(deviceId);
    console.log("Device info response:", response);
    if (response && response.data) {
      const data = response.data;
      monitorData.value.deviceID = data.deviceId || monitorData.value.deviceID;
      monitorData.value.ip = data.ip || monitorData.value.ip;
      monitorData.value.prot = data.protocol || monitorData.value.prot;
    }
  } catch (error) {
    console.error("Error fetching device info:", error);
  }
};

const handleBtnClick = (btn) => {
  console.log(`Button clicked: ${btn}`);
};

onMounted(() => {
  videoSrc.value = decodeVideoUrl(rawVideoUrl.value);
  getDeviceInfo(monitorData.value.deviceID);
});
</script>

<style scoped>
.monitor-page {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  padding: 24px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #222;
  align-items: stretch;
}

.monitor-live {
  background: #fff;
  border: 1px solid #e1e5eb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.view-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #f5f7fa;
  border: 1px solid #e1e5eb;
  margin-bottom: 12px;
}

.view-switch-label {
  font-weight: 700;
  color: #334155;
  white-space: nowrap;
}

.view-switch-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.video-url-input {
  min-width: 320px;
  max-width: 520px;
}

@media (max-width: 720px) {
  .video-url-input {
    min-width: 160px;
    max-width: 100%;
    flex: 1 1 auto;
  }
}

.monitor-page.single-view {
  grid-template-columns: 1fr;
}

.monitor-live h1 {
  margin: 0 0 16px;
  font-size: 1.4rem;
}

.video-wrapper {
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
  border-radius: 12px;
  background: #000;
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* When showing panels side-by-side, use a fixed min-height instead of aspect padding
   so both panels visually align and expand to available space. */
.monitor-page:not(.single-view) .video-wrapper {
  padding-top: 0;
  min-height: 360px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 10px;
  background: #f5f7fa;
}

.detail-item .v-field,
.detail-item .v-select,
.detail-item .v-checkbox,
.detail-item .date-time-component {
  width: 100%;
}

.detail-label {
  font-weight: 700;
  color: #334155;
}

.detail-value {
  color: #475569;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button-group > div {
  min-width: 120px;
}

@media (max-width: 960px) {
  .monitor-page {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  .monitor-live {
    padding: 18px;
  }

  .monitor-live h1 {
    font-size: 1.25rem;
  }
}

@media (max-width: 640px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .detail-item {
    padding: 12px 14px;
  }

  .button-group {
    justify-content: stretch;
  }

  .button-group > div {
    flex: 1 1 100%;
  }
}

.input-video-url {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px;
}
</style>
