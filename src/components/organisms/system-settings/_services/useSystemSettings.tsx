import { updateRegistrationLimitSchema } from "@/schema/system_settings.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createSystemConfigThunk,
  getActiveActiveUsersThunk,
  getSystemConfigThunk,
  updateSystemConfigThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import {
  EConfigNames,
  TGetSystemConfigThunkError,
} from "@/store/reducers/allUsersSlice/types";
import {
  getServerInfoLatencyThunk,
  getServerInfoThunk,
} from "@/store/reducers/globalInfo/globalInfoSlice/thunks";
import { ZabbixMetrics } from "@/store/reducers/globalInfo/globalInfoSlice/types";
import { H4, P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type TRegistrationLimitFormValues = z.infer<
  typeof updateRegistrationLimitSchema
>;
const useSystemSettings = () => {
  const dispatch = useAppDispatch();
  const { serverInfo, serverInfoLatency, loading } = useAppSelector(
    (state) => state.globalInfo
  );
  const activeUsersCount = useAppSelector(
    (state) => state.users.activeUsersState.data?.count
  );
  const { control, handleSubmit, reset } =
    useForm<TRegistrationLimitFormValues>({
      resolver: zodResolver(updateRegistrationLimitSchema),
      defaultValues: { is_enabled: false },
    });
  const ServerInfoObject = useMemo<ZabbixMetrics[]>(() => {
    if (!serverInfo) return [];
    return Object.keys(serverInfo.zabbix).map((key) => ({
      title: key,
      disk_used_percent: serverInfo.zabbix[key].disk_used_percent,
      disk_total: serverInfo.zabbix[key].disk_total,
      disk_used: serverInfo.zabbix[key].disk_used,
      memory_available: serverInfo.zabbix[key].memory_available,
      memory_available_percent: serverInfo.zabbix[key].memory_available_percent,
      cpu_usage: serverInfo.zabbix[key].cpu_usage,
    }));
  }, [serverInfo]);

  const fields = [
    {
      renderComponent: () => {
        return (
          <Box width={"100%"}>
            <Box sx={{ display: "flex", paddingBottom: "15px" }}>
              <P
                fontWeight={700}
                color="primary.main"
                paddingRight={"5px"}
                fontSize={"23px"}
              >
                {t("server_status")}:
              </P>{" "}
              <P fontSize={"23px"}>
                {serverInfo?.partner_api?.status &&
                serverInfo.partner_api.status === "inactive"
                  ? `${t("inactive")}`
                  : `${t("active")}`}
              </P>
            </Box>
            {ServerInfoObject.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    mb: 2,
                  }}
                >
                  <H4
                    color="primary.main"
                    paddingRight={"25px"}
                    paddingBottom={"10px"}
                  >
                    {item.title}:
                  </H4>
                  <Box>
                    <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                      <P
                        fontWeight={500}
                        color="primary.main"
                        paddingRight={"5px"}
                        fontSize={"18px"}
                      >
                        {t("cpu_usage")}:
                      </P>{" "}
                      <P fontSize={"18px"}>
                        {item.cpu_usage
                          ? `${item.cpu_usage}`
                          : "No data available"}
                      </P>
                    </Box>
                    <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                      <P
                        fontWeight={500}
                        color="primary.main"
                        paddingRight={"5px"}
                        fontSize={"18px"}
                      >
                        {t("disk_total")}:
                      </P>{" "}
                      <P fontSize={"18px"}>
                        {item.disk_total
                          ? `${item.disk_total}`
                          : "No data available"}
                      </P>
                    </Box>
                    <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                      <P
                        fontWeight={500}
                        color="primary.main"
                        paddingRight={"5px"}
                        fontSize={"18px"}
                      >
                        {t("disk_used")}:
                      </P>{" "}
                      <P fontSize={"18px"}>
                        {item.disk_used
                          ? `${item.disk_used}%`
                          : "No data available"}
                      </P>
                    </Box>
                    <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                      <P
                        fontWeight={500}
                        color="primary.main"
                        paddingRight={"5px"}
                        fontSize={"18px"}
                      >
                        {t("disk_used_percent")}:
                      </P>{" "}
                      <P fontSize={"18px"}>
                        {item.disk_used_percent
                          ? `${item.disk_used_percent}`
                          : "No data available"}
                      </P>
                    </Box>
                    <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                      <P
                        fontWeight={500}
                        color="primary.main"
                        paddingRight={"5px"}
                        fontSize={"18px"}
                      >
                        {t("memory_available")}:
                      </P>{" "}
                      <P>
                        {item.memory_available
                          ? `${item.memory_available}`
                          : "No data available"}
                      </P>
                    </Box>
                    <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                      <P
                        fontWeight={500}
                        color="primary.main"
                        paddingRight={"5px"}
                        fontSize={"18px"}
                      >
                        {t("memory_available_percent")}:
                      </P>{" "}
                      <P fontSize={"18px"}>
                        {item.memory_available_percent
                          ? `${item.memory_available_percent}`
                          : "No data available"}
                      </P>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        );
      },
    },
  ];
  const fieldsSecondSide = [
    {
      renderComponent: () => {
        return (
          <Box width={"100%"}>
            {
              <Box
                sx={{
                  display: "flex",
                  paddingBottom: "5px",
                  flexDirection: "column",
                }}
              >
                <H4
                  color="primary.main"
                  paddingRight={"25px"}
                  paddingBottom={"10px"}
                >
                  {t("mysql")}
                </H4>
                <Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("status")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.mysql?.status
                        ? `${serverInfo.mysql.status}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("response_time_ms")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.mysql?.response_time_ms
                        ? `${serverInfo.mysql.response_time_ms}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("db_connections")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.db_connections
                        ? `${serverInfo.db_connections}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("ping")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.ping
                        ? `${serverInfo.ping}`
                        : "No data available"}
                    </P>
                  </Box>
                </Box>
                <H4
                  color="primary.main"
                  paddingRight={"25px"}
                  paddingBottom={"10px"}
                >
                  {t("frontend")}
                </H4>
                <Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("status")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.frontend?.status
                        ? `${serverInfo.frontend.status}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("http_code")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.frontend?.http_code
                        ? `${serverInfo.frontend.http_code}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("response_time_ms")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.frontend?.response_time_ms
                        ? `${serverInfo.frontend.response_time_ms}`
                        : "No data available"}
                    </P>
                  </Box>
                </Box>
                <H4
                  color="primary.main"
                  paddingRight={"25px"}
                  paddingBottom={"10px"}
                >
                  {t("backend")}
                </H4>
                <Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("status")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.backend?.status
                        ? `${serverInfo.backend.status}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("http_code")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.backend?.http_code
                        ? `${serverInfo.backend.http_code}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("response_time_ms")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.backend?.response_time_ms
                        ? `${serverInfo.backend.response_time_ms}`
                        : "No data available"}
                    </P>
                  </Box>
                </Box>
                <H4
                  color="primary.main"
                  paddingRight={"25px"}
                  paddingBottom={"10px"}
                >
                  {t("ssl_cert")}
                </H4>
                <Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("status")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.ssl_cert?.status
                        ? `${serverInfo.backend.status}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("http_code")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.ssl_cert?.message
                        ? `${serverInfo.ssl_cert.message}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("valid_until_date")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.ssl_cert?.valid_until
                        ? `${serverInfo.ssl_cert.valid_until}`
                        : "No data available"}
                    </P>
                  </Box>
                </Box>
                <H4
                  color="primary.main"
                  paddingRight={"25px"}
                  paddingBottom={"10px"}
                >
                  {t("partner_api")}
                </H4>
                <Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("http_code")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.partner_api?.message
                        ? `${serverInfo.partner_api.message}`
                        : "No data available"}
                    </P>
                  </Box>
                </Box>
                <H4
                  color="primary.main"
                  paddingRight={"25px"}
                  paddingBottom={"10px"}
                >
                  {t("login_check")}
                </H4>
                <Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("status")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.login_check?.status
                        ? `${serverInfo.login_check.status}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("http_code")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.login_check?.http_code
                        ? `${serverInfo.login_check.http_code}`
                        : "No data available"}
                    </P>
                  </Box>
                </Box>
                <H4
                  color="primary.main"
                  paddingRight={"25px"}
                  paddingBottom={"10px"}
                >
                  {t("health_check")}
                </H4>
                <Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("status")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.health_check?.status
                        ? `${serverInfo.health_check.status}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("http_code")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.health_check?.http_code
                        ? `${serverInfo.health_check.http_code}`
                        : "No data available"}
                    </P>
                  </Box>
                  <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                    <P
                      fontWeight={500}
                      color="primary.main"
                      paddingRight={"5px"}
                      fontSize={"18px"}
                    >
                      {t("response_time_ms")}:
                    </P>{" "}
                    <P fontSize={"18px"}>
                      {serverInfo?.health_check?.response_time_ms
                        ? `${serverInfo.health_check.response_time_ms}`
                        : "No data available"}
                    </P>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                  <P
                    fontWeight={700}
                    color="primary.main"
                    paddingRight={"5px"}
                    fontSize={"18px"}
                  >
                    {t("backend_version")}:
                  </P>{" "}
                  <P fontSize={"18px"}>
                    {serverInfo?.backend_version
                      ? `${serverInfo.backend_version}`
                      : "No data available"}
                  </P>
                </Box>
              </Box>
            }
          </Box>
        );
      },
    },
  ];
  const fieldsThirdSide = [
    {
      renderComponent: () => {
        return (
          <Box width={"100%"}>
            {serverInfoLatency &&
              Object.keys(serverInfoLatency).map((nodeName, index) => {
                const nodeData = serverInfoLatency[nodeName];
                if (nodeData && nodeData.length > 0) {
                  const [status, latency, message, httpCode, ip] = nodeData[0];
                  return (
                    <Box key={index} sx={{ mb: 3 }}>
                      <H4
                        color="primary.main"
                        paddingRight={"25px"}
                        paddingBottom={"10px"}
                      >
                        {nodeName}
                      </H4>
                      <Box>
                        <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                          <P
                            fontWeight={500}
                            color="primary.main"
                            paddingRight={"5px"}
                            fontSize={"18px"}
                          >
                            Status:
                          </P>
                          <P fontSize={"18px"}>
                            {status ? `${status}` : "No data available"}
                          </P>
                        </Box>
                        <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                          <P
                            fontWeight={500}
                            color="primary.main"
                            paddingRight={"5px"}
                            fontSize={"18px"}
                          >
                            Latency:
                          </P>
                          <P fontSize={"18px"}>
                            {latency
                              ? `${(latency * 1000).toFixed(2)}ms`
                              : "No data available"}
                          </P>
                        </Box>
                        <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                          <P
                            fontWeight={500}
                            color="primary.main"
                            paddingRight={"5px"}
                            fontSize={"18px"}
                          >
                            Message:
                          </P>
                          <P fontSize={"18px"}>
                            {message ? `${message}` : "No data available"}
                          </P>
                        </Box>
                        <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                          <P
                            fontWeight={500}
                            color="primary.main"
                            paddingRight={"5px"}
                            fontSize={"18px"}
                          >
                            HTTP Code:
                          </P>
                          <P fontSize={"18px"}>
                            {httpCode ? `${httpCode}` : "No data available"}
                          </P>
                        </Box>
                        <Box sx={{ display: "flex", paddingBottom: "5px" }}>
                          <P
                            fontWeight={500}
                            color="primary.main"
                            paddingRight={"5px"}
                            fontSize={"18px"}
                          >
                            IP Address:
                          </P>
                          <P fontSize={"18px"}>
                            {ip ? `${ip}` : "No data available"}
                          </P>
                        </Box>
                      </Box>
                    </Box>
                  );
                }
                return null;
              })}
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    const initSystemConfig = async () => {
      try {
        const data = await dispatch(
          getSystemConfigThunk({ name: EConfigNames.registration_limit })
        ).unwrap();

        reset({
          name: data.name,
          is_enabled: data.is_enabled,
          registration_limit: data.config?.registration_limit.toString(),
          registration_time_minutes:
            data.config?.registration_time_minutes.toString(),
        });
      } catch (error) {
        const typedError = error as TGetSystemConfigThunkError;

        if (typeof typedError === "object" && typedError.status === 404) {
          const data = await dispatch(
            createSystemConfigThunk({
              name: EConfigNames.registration_limit,
              is_enabled: false,
              config: {
                name: EConfigNames.registration_limit,
                registration_limit: 100,
                registration_time_minutes: 1,
              },
            })
          ).unwrap();

          reset({
            is_enabled: data.is_enabled,
            name: data.name,
            registration_limit: data.config_data.registration_limit.toString(),
            registration_time_minutes:
              data.config_data.registration_time_minutes.toString(),
          });
        }
      }
    };

    initSystemConfig();
  }, [dispatch, reset]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await dispatch(getActiveActiveUsersThunk()).unwrap();
      } catch (error) {
        console.log(error);
      }
    }, 50000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(
        updateSystemConfigThunk({
          config: {
            name: EConfigNames.registration_limit,
            registration_limit: Number(data.registration_limit),
            registration_time_minutes: Number(data.registration_time_minutes),
          },
          is_enabled: data.is_enabled,
          name: EConfigNames.registration_limit,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    dispatch(getServerInfoThunk());
    dispatch(getServerInfoLatencyThunk());
  }, []);

  return {
    loading,
    serverInfoLatency,
    activeUsersCount,
    ServerInfoObject,
    fieldsSecondSide,
    fields,
    fieldsThirdSide,
    control,
    onSubmit,
  };
};

export default useSystemSettings;
