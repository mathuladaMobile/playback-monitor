<template>
  <div class="monitor-page">
    <section class="monitor-live">
      <h1>Live</h1>
      <div class="video-wrapper">
        <video :src="videoSrc" controls autoplay muted playsinline></video>
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
            :items="['main', 'sub']"
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
        </div>
      </div>
    </section>

    <section class="button-group">
      <v-btn>Live</v-btn>
      <v-btn>Stop</v-btn>
      <v-btn>Turn on sound</v-btn>
      <v-btn>Turn off sound</v-btn>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const videoSrc = ref("https://www.w3schools.com/html/mov_bbb.mp4");

const monitorData = ref({
  ip: "192.168.1.100",
  prot: "RTSP",
  deviceID: "Device123",
  channel: "Channel 1",
  stream: "main",
  openAudio: true,
  cacheDuration: "5s",
  currentUsername: "admin",
});

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
]);
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

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details-grid {
  display: grid;
  gap: 12px;
  
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  background: #f5f7fa;
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
  gap: 12px;
}
</style>
