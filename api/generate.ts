import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 请求' });
  }

  try {
    const { apiKey, plotDescription, shotCount, duration, imageBase64 } = req.body;

    if (!apiKey) {
      return res.status(400).json({ error: 'API Key 不能为空' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `你是一位专业的视频分镜导演和编剧。请根据以下信息生成专业级的视频分镜提示词：

【剧情描述】
${plotDescription}

【镜头数量】
${shotCount}

【视频时长】
${duration}

请按照以下格式输出分镜提示词：

镜头X (时间点): [画面描述] - [镜头类型] - [光影风格] - [镜头运动]

要求：
1. 每个镜头要有明确的时间点
2. 画面描述要详细具体
3. 镜头类型包括：全景、中景、近景、特写、大特写、俯拍、仰拍等
4. 光影风格要与剧情氛围匹配
5. 镜头运动包括：固定、推镜头、拉镜头、摇镜头、移镜头、跟拍等
6. 语言要专业但易于理解
7. 突出视觉效果和氛围营造
8. 生成足够数量的镜头以填满所选的网格数量

请直接输出分镜提示词，不要有其他多余内容。`;

    let result;

    if (imageBase64) {
      const imagePart = {
        inlineData: {
          data: imageBase64.split(',')[1],
          mimeType: 'image/png',
        },
      };
      result = await model.generateContent([prompt, imagePart]);
    } else {
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    const text = response.text();

    res.status(200).json({ success: true, content: text });
  } catch (error) {
    console.error('API调用错误:', error);
    res.status(500).json({ 
      error: '生成失败，请检查API Key是否正确，或稍后重试',
      details: (error as Error).message 
    });
  }
}