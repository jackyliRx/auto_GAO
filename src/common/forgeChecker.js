import statusChecker from "./statusChecker";
const ElMessage = (msg) => console.log("[自動化訊息]", msg);
ElMessage.success = (msg) => console.log("[自動化成功]", msg);
ElMessage.warning = (msg) => console.warn("[自動化警告]", msg);
ElMessage.error = (msg) => console.error("[自動化錯誤]", msg);

class forgeChecker extends statusChecker {
  constructor(profile, setProfileInfo, user) {
    super(profile, setProfileInfo, user);
  }

  checkStatus = async () => {
    if (this.profile.actionStatus === "鍛造") {
      if (this.forgeTime() < -5) {
        let profile = await this.user.forgeComplete();
        if (profile) {
          this.profile = profile;
          await this.setProfileInfo(profile);
          ElMessage("鍛造完成");
        }
        return true;
      } else {
        ElMessage(`鍛造中！(耗時：${this.actionTime()})分，背景共存中`);
        return false;
      }
    }
    // 其他狀態不阻礙發起鍛造
    return true;
  };
}

export default forgeChecker;
