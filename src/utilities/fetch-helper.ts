"use server";

import { cookies, headers } from "next/headers";
import { getErrorMessage } from "./helper";

const host = process.env.BACKEND_HOST;

async function verifyToken(): Promise<{ statusCode: number; message: string }> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (accessToken === undefined && refreshToken === undefined) {
    return { statusCode: 401, message: "unauthorize" };
  } else if (accessToken === undefined && refreshToken !== undefined) {
    try {
      const responseRefreshToken = await fetch(`${process.env.BACKEND_HOST}/api/system/authentication/refresh-token`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      });

      if (responseRefreshToken.ok) {
        const json = await responseRefreshToken.json();
        cookieStore.set({
          name: "access_token",
          value: json["access_token"],
          expires: new Date(json["access_token_expires"]),
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          priority: "high",
        });
        cookieStore.set({
          name: "refresh_token",
          value: json["refresh_token"],
          expires: new Date(json["refresh_token_expires"]),
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          priority: "high",
        });

        return { statusCode: 200, message: "" };
      } else {
        return { statusCode: 401, message: "unauthorize" };
      }
    } catch (error) {
      console.error(error);
      return { statusCode: 500, message: getErrorMessage(error) };
    }
  }

  // if (accessToken !=== undefined)
  return { statusCode: 200, message: "" };
}

export async function GET<T>({
  isAuth,
  path,
  query,
  cache,
}: {
  isAuth: boolean;
  path: string;
  query?: string;
  cache?: RequestCache;
}): Promise<{
  status: number | undefined;
  message: string | undefined;
  page: number | undefined;
  pageSize: number | undefined;
  count: number | undefined;
  data: T | undefined;
}> {
  try {
    const headersList = await headers()

    let response: Response;
    const fetchPath = `${host}${path}${query ? `?${query}` : ""}`;
    if (isAuth) {
      const verifyResult = await verifyToken();
      if (verifyResult.statusCode !== 200) {
        return {
          status: verifyResult.statusCode,
          message: verifyResult.message,
          page: undefined,
          pageSize: undefined,
          count: undefined,
          data: undefined,
        };
      }
      const token = (await cookies()).get("access_token")?.value;

      response = await fetch(fetchPath, {
        method: "GET",
        cache: cache ?? "default",
        headers: {
          authorization: `Bearer ${token}`,
          "user-agent": headersList.get('user-agent')!
        }
      });
    } else {
      response = await fetch(fetchPath, {
        method: "GET",
        cache: cache ?? "default",
        headers: {
          "user-agent": headersList.get('user-agent')!
        }
      });
    }

    if (response.ok) {
      const json = await response.json();
      return {
        status: response.status,
        message: response.statusText,
        page: json.page,
        pageSize: json.pageSize,
        count: json.count,
        data: json.data
      };
    } else {
      const text = await response.text();
      return {
        status: response.status,
        message: text,
        page: undefined,
        pageSize: undefined,
        count: undefined,
        data: undefined
      };
    }

  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: getErrorMessage(error),
      page: undefined,
      pageSize: undefined,
      count: undefined,
      data: undefined,
    };
  }
}

export async function POST<T>({
  isAuth,
  path,
  contentType,
  query,
  body,
  cache,
}: {
  isAuth: boolean;
  path: string;
  contentType?: string;
  query?: string;
  body?: BodyInit;
  cache?: RequestCache;
}): Promise<{
  status: number | undefined;
  message: string | undefined;
  data: T | undefined;
}> {
  try {
    const headersList = await headers();

    let response: Response;
    const fetchPath = `${host}${path}${query ? `?${query}` : ""}`;
    if (isAuth) {
      const verifyResult = await verifyToken();
      if (verifyResult.statusCode !== 200) {
        return {
          status: verifyResult.statusCode,
          message: verifyResult.message,
          data: undefined,
        };
      }
      const token = (await cookies()).get("access_token")?.value;

      response = await fetch(fetchPath, {
        method: "POST",
        cache: cache ?? "default",
        headers: {
          "content-type": contentType ?? "application/json",
          authorization: `Bearer ${token}`,
          "user-agent": headersList.get('user-agent')!
        },
        body: body,
      });
    } else {
      response = await fetch(fetchPath, {
        method: "POST",
        cache: cache ?? "default",
        headers: {
          "content-type": contentType ?? "application/json",
          "user-agent": headersList.get('user-agent')!
        },
        body: body,
      });
    }

    const text = await response.text();
    try {
      const result = JSON.parse(text);

      return {
        status: response.status,
        message: response.statusText,
        data: result
      };
    } catch {
      return {
        status: response.status,
        message: response.statusText,
        data: text as T,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: getErrorMessage(error),
      data: undefined,
    };
  }
}

export async function PUT<T>({
  isAuth,
  path,
  contentType,
  query,
  body,
  cache,
}: {
  isAuth: boolean;
  path: string;
  contentType?: string;
  query?: string;
  body?: BodyInit;
  cache?: RequestCache;
}): Promise<{
  status: number | undefined;
  message: string | undefined;
  data: T | undefined;
}> {
  try {
    const headersList = await headers();

    let response: Response;
    const fetchPath = `${host}${path}${query ? `?${query}` : ""}`;
    if (isAuth) {
      const verifyResult = await verifyToken();
      if (verifyResult.statusCode !== 200) {
        return {
          status: verifyResult.statusCode,
          message: verifyResult.message,
          data: undefined,
        };
      }
      const token = (await cookies()).get("access_token")?.value;

      response = await fetch(fetchPath, {
        method: "PUT",
        cache: cache ?? "default",
        headers: {
          "content-type": contentType ?? "application/json",
          authorization: `Bearer ${token}`,
          "user-agent": headersList.get('user-agent')!
        },
        body: body,
      });
    } else {
      response = await fetch(fetchPath, {
        method: "PUT",
        cache: cache ?? "default",
        headers: {
          "content-type": contentType ?? "application/json",
          "user-agent": headersList.get('user-agent')!
        },
        body: body,
      });
    }

    const text = await response.text();
    try {
      const result = JSON.parse(text);

      return {
        status: response.status,
        message: response.statusText,
        data: result
      };
    } catch {
      return {
        status: response.status,
        message: response.statusText,
        data: text as T,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: getErrorMessage(error),
      data: undefined,
    };
  }
}

export async function PATCH<T>({
  isAuth,
  path,
  contentType,
  query,
  body,
  cache,
}: {
  isAuth: boolean;
  path: string;
  contentType?: string;
  query?: string;
  body?: BodyInit;
  cache?: RequestCache;
}): Promise<{
  status: number | undefined;
  message: string | undefined;
  data: T | undefined;
}> {
  try {
    const headersList = await headers();

    let response: Response;
    const fetchPath = `${host}${path}${query ? `?${query}` : ""}`;
    if (isAuth) {
      const verifyResult = await verifyToken();
      if (verifyResult.statusCode !== 200) {
        return {
          status: verifyResult.statusCode,
          message: verifyResult.message,
          data: undefined,
        };
      }
      const token = (await cookies()).get("access_token")?.value;

      response = await fetch(fetchPath, {
        method: "PATCH",
        cache: cache ?? "default",
        headers: {
          "content-type": contentType ?? "application/json",
          authorization: `Bearer ${token}`,
          "user-agent": headersList.get('user-agent')!
        },
        body: body,
      });
    } else {
      response = await fetch(fetchPath, {
        method: "PATCH",
        cache: cache ?? "default",
        headers: {
          "content-type": contentType ?? "application/json",
          "user-agent": headersList.get('user-agent')!
        },
        body: body,
      });
    }
    
    const text = await response.text();
    try {
      const result = JSON.parse(text);

      return {
        status: response.status,
        message: response.statusText,
        data: result
      };
    } catch {
      return {
        status: response.status,
        message: response.statusText,
        data: text as T,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: getErrorMessage(error),
      data: undefined,
    };
  }
}

export async function DELETE<T>({
  isAuth,
  path,
  query,
  cache,
}: {
  isAuth: boolean;
  path: string;
  query?: string;
  cache?: RequestCache;
}): Promise<{
  status: number | undefined;
  message: string | undefined;
  data: T | undefined;
}> {
  try {
    const headersList = await headers();

    let response: Response;
    const fetchPath = `${host}${path}${query ? `?${query}` : ""}`;
    if (isAuth) {
      const verifyResult = await verifyToken();
      if (verifyResult.statusCode !== 200) {
        return {
          status: verifyResult.statusCode,
          message: verifyResult.message,
          data: undefined,
        };
      }
      const token = (await cookies()).get("access_token")?.value;

      response = await fetch(fetchPath, {
        method: "DELETE",
        cache: cache ?? "default",
        headers: {
          authorization: `Bearer ${token}`,
          "user-agent": headersList.get('user-agent')!
        },
      });
    } else {
      response = await fetch(fetchPath, {
        method: "DELETE",
        cache: cache ?? "default",
        headers: {
          "user-agent": headersList.get('user-agent')!
        },
      });
    }

    const text = await response.text();
    try {
      const result = JSON.parse(text);

      return {
        status: response.status,
        message: response.statusText,
        data: result
      };
    } catch {
      return {
        status: response.status,
        message: response.statusText,
        data: text as T,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: getErrorMessage(error),
      data: undefined,
    };
  }
}
