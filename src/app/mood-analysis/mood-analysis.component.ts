import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import * as faceapi from 'face-api.js';

declare var navigator: any;

@Component({
  selector: 'app-mood-analysis',
  standalone: true,
  imports: [FormsModule, CommonModule, WebcamModule],
  templateUrl: './mood-analysis.component.html',
  styleUrl: './mood-analysis.component.css',
})
export class MoodAnalysisComponent implements OnInit {
  async ngOnInit() {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models'),
      await faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models'),
      await faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models'),
      await faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models'),
    ]).then(() => this.startVideo());
  }

  WIDTH = 440;
  HEIGHT = 280;
  @ViewChild('video', { static: true })
  public video: any;

  @ViewChild('canvas', { static: true })
  public canvasRef: any;

  elRef = inject(ElementRef);

  stream: any;
  detection: any;
  resizedDetections: any;
  canvas: any;
  canvasEl: any;
  displaySize: any;
  videoInput: any;
  happy: boolean = false;
  sad: boolean = false;
  uplifted: boolean = false;
  calm: boolean = false;
  energetic: boolean = false;
  romantic: boolean = false;
  private trigger: Subject<void> = new Subject<void>();
  public webcamImage: any;

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('Saved webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  startVideo() {
    this.videoInput = this.video.nativeElement;
    navigator.mediaDevices.getUserMedia(
      { video: {}, audio: false },
      (stream: any) => (this.videoInput.srcObject = stream),
      (err: any) => console.log(err),
    );
    this.detect_Faces();
  }

  async detect_Faces() {
    this.elRef.nativeElement.querySelector('video').addEventListener('play', async () => {
      this.canvas = await faceapi.createCanvasFromMedia(this.videoInput);
      this.canvasEl = this.canvasRef.nativeElement;
      this.canvasEl.appendChild(this.canvas);
      this.canvas.setAttribute('id', 'canvass');
      this.canvas.setAttribute(
        'style',
        `position: fixed;
    top: 0;
    left: 0;`,
      );
      this.displaySize = {
        width: this.videoInput.width,
        height: this.videoInput.height,
      };
      faceapi.matchDimensions(this.canvas, this.displaySize);
      setInterval(async () => {
        this.detection = await faceapi
          .detectAllFaces(this.videoInput, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        this.resizedDetections = faceapi.resizeResults(this.detection, this.displaySize);
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        faceapi.draw.drawDetections(this.canvas, this.resizedDetections);
        faceapi.draw.drawFaceLandmarks(this.canvas, this.resizedDetections);
        faceapi.draw.drawFaceExpressions(this.canvas, this.resizedDetections);
      }, 100);
    });
  }
}
