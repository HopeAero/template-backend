import * as concat from "concat-stream";
import { Readable as ReadableStream } from "stream";
import { Buffer } from "buffer";
import { plainToClass } from "class-transformer";
import { FormDataInterceptorConfig, StoredFile } from "nestjs-form-data";
import { ParticleStoredFile } from "nestjs-form-data/dist/interfaces/ParticleStoredFile";
import * as fs from "fs";
import * as path from "path";

const directory = path.join(__dirname, "..", "..", "../uploads");

export class CustomFileStorage extends StoredFile {
  size: number;
  buffer: Buffer;
  _filePath: string;
  directory: string = directory;

  constructor() {
    super();
    this._filePath = "";
  }

  static create(
    busboyFileMeta: ParticleStoredFile,
    stream: ReadableStream,
    config: FormDataInterceptorConfig,
  ): Promise<CustomFileStorage> {
    return new Promise<CustomFileStorage>((res, rej) => {
      stream.pipe(
        concat({ encoding: "buffer" }, (buffer: Buffer) => {
          const tmpPath = path.join(config.fileSystemStoragePath, busboyFileMeta.originalName);
          const file: CustomFileStorage = plainToClass(CustomFileStorage, {
            originalName: busboyFileMeta.originalName,
            encoding: busboyFileMeta.encoding,
            busBoyMimeType: busboyFileMeta.mimetype,
            buffer,
            size: buffer.length,
            tmpPath,
          });

          res(file);
        }),
      );
    });
  }

  async save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const filePath = path.join(this.directory, this.originalName + "." + this.fileType.ext);
      fs.writeFile(filePath, this.buffer, (err) => {
        if (err) {
          return reject(err);
        }
        const index = filePath.indexOf("uploads");
        const relativePath = filePath.substring(index);

        this._filePath = relativePath;
        resolve();
      });
    });
  }

  getFilePath(): string {
    return this._filePath;
  }

  urlFile(): string {
    return this._filePath.replace(/\\/g, "/");
  }

  delete(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
