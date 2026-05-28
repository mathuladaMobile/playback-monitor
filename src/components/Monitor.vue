<template>
  <div class="monitor-page">
    <!--------------------------->
    <!-- Monitor Real Time Section -->
    <!--------------------------->
    <section class="monitor-live">
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
        <div class="detail-item" v-for="item in detailItems" :key="item.label">
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
          <v-btn @click="handleBtnClick(v)">{{ v }}</v-btn>
        </div>
      </section>
    </section>

    <!--------------------------->
    <!-- Monitor Video playback Section -->
    <!--------------------------->
    <section class="monitor-live">
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
        <div class="detail-item" v-for="item in detailItems" :key="item.label">
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
          <v-btn @click="handleBtnClick(v)">{{ v }}</v-btn>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DateTimeComponent from "./input/DateTimeComponent.vue";

const videoSrc = ref(
  "https://superhero.mobileinnovation.asia/vss/apiPage/RealVideo.html?token=deb4cc288714456aa510c3cef0f6b193&deviceId=31086000100&chs=1&stream=0&wnum=1&panel=1&buffer=2000",
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

const realTimeBtns = ["Live", "Stop", "Turn on sound", "Turn off sound"];
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

const types = [
  { value: "live", label: "Live" },
  { value: "alarm", label: "Alarm File" },
  { value: "playback", label: "Video Playback" },
  { value: "auto-download", label: "Auto Download Server File" },
  { value: "cloud", label: "Cloud Video File" },
];

const selectedType = ref("live");

const detailItems = computed(() => [
  { label: "Ip", value: monitorData.value.ip, input: "text" },
  { label: "Prot", value: monitorData.value.prot, input: "text" },
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

const handleBtnClick = (btn) => {
  console.log(`Button clicked: ${btn}`);
  if (btn === "Live") {
    videoSrc.value =
      "https://superhero.mobileinnovation.asia/vss/apiPage/RealVideo.html?token=deb4cc288714456aa510c3cef0f6b193&deviceId=31086000100&chs=1&stream=0&wnum=1&panel=1&buffer=2000";
  } else if (btn === "Playback") {
    videoSrc.value =
      "https://superhero.mobileinnovation.asia/vss/apiPage/PlaybackVideo.html?token=deb4cc288714456aa510c3cef0f6b193&deviceId=31086000100&chs=1&stream=0&wnum=1&panel=1&buffer=2000";
  }
};
</script>

<style scoped>
.monitor-page {
  display: grid;
  gap: 24px;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #222;
}

.monitor-live {
  background: #fff;
  border: 1px solid #e1e5eb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
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
</style>
